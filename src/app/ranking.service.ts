import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { EntriesService } from './entries.service';
import { Entry, ApiService } from './api.service';
import { interval } from 'rxjs';
import { UpdateService } from './update.service';


export interface RankingEntry
{
  position: number;
  name: string;
  value: number;
  delta: number;
  offset: number;
  total: number;
}


@Injectable({
  providedIn: 'root'
})

export class RankingService {


  constructor(private updateService: UpdateService, private entriesService: EntriesService, private apiService: ApiService, private logService: LogService) {
    entriesService.onEntryAdded.subscribe((e) => this.onEntryAdded(e));
    entriesService.onEntryChanged.subscribe((e) => {
      if(e !== null) {
        this.onEntryChanged(e.current)
      }
    });
    entriesService.onEntryRemoved.subscribe((e) => this.onEntryRemoved(e));
    updateService.onUpdate.subscribe((e) => this.update());
    this.initEntries();
    this.update();
   }

   private update() {
      this.logService.log("update");
     this.apiService.getRemunerators().subscribe((response) => {

      response.data.forEach((e,i,a) => {
        let index = this.entries.findIndex((value,index,a) => {
          if(value.name === e.name)
          {
            this.entries[index].offset = e.offset;
          }
        });
      });
      this.recalculate();
    });

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
      this.entries.push({name: names[index], value: values[index], offset: 0} as RankingEntry);
    }
    this.recalculate();
  }
  private recalculate() {
    this.entries=    this.entries.sort((a,b) => {
      if((a.value + a.offset) < (b.value + b.offset)) return 1;
      if((a.value + a.offset) > (b.value + b.offset)) return -1;
      return 0;
    });
    for (let index = 0; index < this.entries.length; index++) {
      if(index+1 < this.entries.length)
        this.entries[index].delta = this.entries[index].value + this.entries[index].offset - (this.entries[index+1].value + this.entries[index+1].offset);
      this.entries[index].position = index +1;
      this.entries[index].total = this.entries[index].value + this.entries[index].offset;
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
