import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { EntriesService } from './entries.service';
import { Entry } from './api.service';


export interface RankingEntry
{
  position: number;
  name: string;
  value: number;
  delta: number;
}


@Injectable({
  providedIn: 'root'
})

export class RankingService {

  constructor(private entriesService: EntriesService, private logService: LogService) {
    entriesService.onEntryAdded.subscribe((e) => this.onEntryAdded(e));
    entriesService.onEntryChanged.subscribe((e) => this.onEntryChanged(e));
    entriesService.onEntryRemoved.subscribe((e) => this.onEntryRemoved(e));

    this.initEntries();
   }

   private initEntries() {
    const names: string[] = [];
    const values: number[] = [];
    this.entriesService.entries.forEach((e,i,a) => {
      let index = names.indexOf(e.remunerator);
      if(index === -1)
      {
        // create entry if it does not exist
        index = names.push(e.remunerator) -1;
        values.push(0);
      }
      values[index] += e.value;

    });
    this.entries = [];
    for (let index = 0; index < names.length; index++) {
      this.entries.push({name: names[index], value: values[index]} as RankingEntry);
    }
    this.entries=    this.entries.sort((a,b) => {
      if(a.value < b.value) return 1;
      if(a.value > b.value) return -1;
      return 0;
    });
    for (let index = 0; index < names.length; index++) {
      if(index+1 < names.length)
        this.entries[index].delta = this.entries[index].value - this.entries[index+1].value;
      this.entries[index].position = index +1;
    }
    this.logService.log(this.entries);
   }

   public entries:RankingEntry[] = [];

   onEntryAdded(e:Entry): void {
    this.initEntries();
   }

   onEntryChanged(e:Entry): void {
    this.initEntries();
   }

   onEntryRemoved(e:Entry): void {
    this.initEntries();
   }
}
