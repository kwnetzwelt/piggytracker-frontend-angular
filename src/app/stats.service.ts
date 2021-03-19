import { Injectable } from '@angular/core';
import { Entry } from './api.service';
import { EntriesService } from './entries.service';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})

export class StatsService {

  private updateScheduled;
  public filter:StatsFilter = new StatsFilter();

  public perUserStats:StatsCollection = new StatsCollection(this.addPerUserEntry);
  public perCategoryStats:StatsCollection = new StatsCollection(this.addPerCategoryEntry);

  constructor(private logService: LogService, private entriesService:EntriesService) 
  { 
    
    // when something changes, we will just recalculate everything, no matter what happened. 
    entriesService.onEntryAdded.subscribe((e) => {this.scheduleUpdate();});
    entriesService.onEntryRemoved.subscribe((e) => {this.scheduleUpdate();});
    entriesService.onEntryChanged.subscribe((e) => {this.scheduleUpdate();});

    this.update();
  }

  private scheduleUpdate(): any{
    if(this.updateScheduled !== undefined)
      clearTimeout(this.updateScheduled);

    this.updateScheduled = setTimeout(()=>{
      this.updateScheduled = false;
      this.update();
    }, 100);
  }

  private update(): any{
    this.clear();

    this.entriesService.entries.forEach((e) => {
      if(!this.filter.contains(e))
        return;
      // for each statsCollection, we willl call the addEntry function
      this.perUserStats.addEntry(e);
      this.perCategoryStats.addEntry(e);
    })

    this.perUserStats.calculate();
    this.perCategoryStats.calculate();
  }

  private clear(): void{
   this.perUserStats.clear(); 
  }

  /**
   * StatsEntryHandlerFunc for adding entries grouped by user. 
   * @param s the collection, that we are manipulating
   * @param e the entry, that we are adding
   */

  private addPerUserEntry(s:StatsCollection, e:Entry): any
  {
    let targetContainer: StatsContainer = null;
    for (let index = 0; index < s.containers.length; index++) {
      const element = s.containers[index];
      if(element.name == e.remunerator)
      {
        targetContainer = element;
        break;
      }
    }
    
    if(targetContainer === null)
    {
      targetContainer = new StatsContainer(e.remunerator);
      
      s.containers.push(targetContainer);
    }

    targetContainer.values.push(e.value);
  }

  /**
   * StatsEntryHandlerFunc for adding entries grouped by category. 
   * @param s the collection, that we are manipulating
   * @param e the entry, that we are adding
   */
  private addPerCategoryEntry(s:StatsCollection, e:Entry): any
  {
    let targetContainer: StatsContainer = null;
    for (let index = 0; index < s.containers.length; index++) {
      const element = s.containers[index];
      if(element.name == e.category)
      {
        targetContainer = element;
        break;
      }
    }
    
    if(targetContainer === null)
    {
      targetContainer = new StatsContainer(e.remunerator);
      s.containers.push(targetContainer);
    }

    targetContainer.values.push(e.value);
  }

}
export class StatsFilter
{
  public startDate:Date = new Date(1970,0,1);
  public endDate:Date = new Date();

  public contains(e:Entry): boolean
  {
    return e.date >= this.startDate && e.date <= this.endDate;
  }
}

export interface StatsEntryHandlerFunc {
  (s:StatsCollection, e:Entry):void;
}

export class StatsCollection
{
  public containers:StatsContainer[] = [];
  
  private addEntryFunction:StatsEntryHandlerFunc;
  
  public constructor(addEntryFunc:StatsEntryHandlerFunc)
  {
    this.addEntryFunction = addEntryFunc;
  }
  
  public clear(): any
  {
    this.containers = [];
  }
  
  public calculate():any {
    this.containers.forEach(e => e.calculate());
  }

  public addEntry(e:Entry): any
  {
    this.addEntryFunction(this, e);
  }
}

export class StatsContainer
{

  public name: string;
  public min:number;
  public max:number;
  public average:number;
  public total:number;
  public count:number;
  public values:number[] = [];

  public clear(): void
  {
    this.min = 0;
    this.max = 0;
    this.average = 0;
    this.values = [];
  }
  constructor(name:string)
  {
    this.name = name;
  }

  public calculate(): any
  {
    this.min = Math.min.apply(Math, this.values);
    this.max = Math.max.apply(Math, this.values);
    this.average = 0;
    this.total = 0;
    this.count = this.values.length;
    if(this.values.length > 0)
    {
      for (let i = 0; i < this.values.length; i++) {
        this.total += this.values[i];
      }
      this.average = this.total / this.values.length;
    }
  }
}