import { Injectable } from '@angular/core';
import { ApiService, Entry } from './api.service';
import { LogService } from './log.service';
import { EntriesService } from './entries.service';
import { UpdateService } from './update.service';
import { getEnabledCategories } from 'trace_events';

export class Target
{
  name: string;
  targetValue: number;
  currentValue: number;
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
    })
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

      });

      if(r.total > (perPage * page))
      {
        this.getTargetsFromServer(perPage, page+1);
      }
    });
  }


  private onEntryAdded(e:Entry): void {
    this.logService.log("added");
    const target:Target = this.getTargetForEntry(e);

    // add the value
    target.currentValue += e.value;
  }
  private onEntryChanged(old: Entry, current: Entry): void {
    this.onEntryRemoved(old);
    this.onEntryAdded(current);
  }
  private onEntryRemoved(e:Entry): void {
    const target:Target = this.getTargetForEntry(e);

    // add the value
    target.currentValue -= e.value;
  }

  private getTargetForEntry(e:Entry): Target {

    // for this entry, convert its date property to an index (Year.Month) we can use to categorize it in our map
    const n = e.date.getFullYear() * 12 + e.date.getMonth();

    // find the targetsEntry with the correct index (Year.Month) or create one
    let targetsEntry:TargetsEntry = this.targets.get(n);
    if(targetsEntry === undefined)
    {
      targetsEntry = new TargetsEntry();
      this.targets.set(n,targetsEntry);
    }

    // find the target for the category
    let target: Target = targetsEntry.targets.get(e.category);
    if(target === undefined)
    {
      target = new Target();
      target.name = e.category;
      targetsEntry.targets.set(e.category, target);
    }
    return target;
  }
}
