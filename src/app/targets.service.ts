import { Injectable } from '@angular/core';
import { ApiService, Entry } from './api.service';
import { LogService } from './log.service';
import { EntriesService } from './entries.service';
import { UpdateService } from './update.service';
import { BehaviorSubject } from 'rxjs';
import { isNumber, isFunction } from 'util';

export class Target
{
  name: string;
  targetValue: number = 0;
  currentValue: number = 0;
  tid: number;
}

export class TargetsEntry
{
  public year(): number
  {
    return Math.floor(this.tid / 12);
  }
  public month(): number
  {
    return this.tid % 12;
  }

  public date(): Date{
    return new Date(this.year(),this.month());
  }

  public spentTotalSum: number = 0;
  public targetTotalSum:number = 0;
  public percentSpent:number = 0;

  public percentTimePast: number =0;
  public isInFuture: boolean = false;
  public recalculate()
  {

    this.spentTotalSum = 0;
    this.targetTotalSum = 0;
    this.targets.forEach((value, key, map) => {
      if(isNumber(value.currentValue))
        this.spentTotalSum+=value.currentValue;
      if(isNumber(value.targetValue))
        this.targetTotalSum+=value.targetValue;
    });

    if(this.targetTotalSum > 0)
      this.percentSpent = this.spentTotalSum / this.targetTotalSum;
    else
      this.percentSpent = 0;

      const d = new Date();
      if(this.year() < d.getFullYear())
      {
        this.percentTimePast = 1;
        this.isInFuture = false;
      }else if(this.month() < d.getMonth())
      {
        this.percentTimePast = 1;
        this.isInFuture = false;
      }else if(this.month() === d.getMonth())
      {
        this.percentTimePast = (d.getUTCDate() / TargetsEntry.monthDays(d));
        this.isInFuture = false;
      }
      else  {
        this.percentTimePast = 0;
        this.isInFuture = true;
      }

  }

  private static monthDays (date: Date): number {
    var d= new Date(date.getFullYear(), date.getMonth()+1, 0);
    return d.getDate();
  }


  tid: number;


  targets: Map<string, Target> = new Map<string, Target>();
}


@Injectable({
  providedIn: 'root'
})

export class TargetsService {
  public targets: Map<number, TargetsEntry> = new Map();
  private perPage: number = 24;
  private firstUpdate = true;


  private onTargetsUpdateSubject: BehaviorSubject<Map<number, TargetsEntry>> = new BehaviorSubject(undefined);
  onTargetsUpdate = this.onTargetsUpdateSubject.asObservable();


  constructor(private updateService: UpdateService, private entriesService: EntriesService, private apiService: ApiService, private logService: LogService) {
    entriesService.onEntryAdded.subscribe((e) => this.onEntryAdded(e));
    entriesService.onEntryChanged.subscribe((e) => {if(e) this.onEntryChanged(e.old, e.current);});
    entriesService.onEntryRemoved.subscribe((e) => {if(e) this.onEntryRemoved(e)});
    updateService.onUpdate.subscribe((v) => {
      if(v){
        if(this.firstUpdate)
        {
          this.getTargetsFromServer(this.perPage,1);
          this.firstUpdate = false;
        }else
        {
          this.getTargetsFromServer(this.perPage,1);
        }
    }
    });
    entriesService.entries.forEach((v,i,a) => {
      this.onEntryAdded(v);
    });
    this.onTargetsUpdateSubject.next(this.targets);
  }

  private getTargetsFromServer(perPage: number, page: number){
    this.apiService.getTargets(perPage, page).subscribe((r) => {

      r.data.forEach((value, index, array) => {
        let targetEntry = this.targets.get(value.tid);
        if(targetEntry === undefined)
        {
          let newEntry = new TargetsEntry();
          newEntry.tid = value.tid;
          this.targets.set(value.tid, newEntry);
          targetEntry = newEntry;
        }
        value.totals.forEach((v,i,a) => {
          let t:Target = targetEntry.targets.get(v.category);
          if(t === undefined)
          {
            t = new Target();
            t.name = v.category;
            t.tid = value.tid;
          }
          t.targetValue = v.value;
          targetEntry.targets.set(v.category, t);
        });
        targetEntry.recalculate();
      });

      if(r.total > (perPage * page))
      {
        this.getTargetsFromServer(perPage, page+1);
      }else{

        this.onTargetsUpdateSubject.next(this.targets);
      }
    });
  }


  private onEntryAdded(e:Entry): void {
    this.logService.log("added");
    const targetEntry:[TargetsEntry,Target] = this.getTargetForEntry(e);

    // add the value
    targetEntry[1].currentValue += e.value;

    targetEntry[0].recalculate();
  }
  private onEntryChanged(old: Entry, current: Entry): void {
    this.onEntryRemoved(old);
    this.onEntryAdded(current);
  }
  private onEntryRemoved(e:Entry): void {
    const targetEntry:[TargetsEntry,Target] = this.getTargetForEntry(e);

    // add the value
    targetEntry[1].currentValue -= e.value;
    targetEntry[0].recalculate();
  }

  private getTargetForEntry(e:Entry): [TargetsEntry,Target] {

    // for this entry, convert its date property to an index (Year.Month) we can use to categorize it in our map
    const n = e.date.getFullYear() * 12 + e.date.getMonth();

    // find the targetsEntry with the correct index (Year.Month) or create one
    let targetsEntry:TargetsEntry = this.targets.get(n);
    if(targetsEntry === undefined)
    {
      targetsEntry = new TargetsEntry();
      targetsEntry.tid = n;
      this.targets.set(n,targetsEntry);
    }

    // find the target for the category
    let target: Target = targetsEntry.targets.get(e.category);
    if(target === undefined)
    {
      target = new Target();
      target.name = e.category;
      target.tid = n;
      targetsEntry.targets.set(e.category, target);
    }
    return [targetsEntry, target];
  }
}
