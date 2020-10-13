import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LogService } from './log.service';
import { isBuffer } from 'util';
import { HttpClient } from '@angular/common/http';
import { ApiService, Entry } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { UpdateService } from './update.service';

export interface EntryChange{
  old: Entry;
  current: Entry;
}

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private perPage: number = 200;
  public entries: Entry[] = [];
  public categories: string[] = [];
  public remunerators: string[] = [];
  private firstUpdate = true;

  constructor(private updateService: UpdateService, private logService: LogService, private apiService: ApiService) {

    this.updateService.onUpdate.subscribe((v) => {
      if(v){
        if(this.firstUpdate)
        {
          this.logService.log("logged in! getting entries");
          this.getEntriesFromServer(this.perPage,1); // fetch each entry individually TODO: User perPage in the future
          this.firstUpdate = false;
        }else
        {
          // TODO UPDATE ENTRIES
        }
      }
    });
  }


  private onEntryAddedSubject: BehaviorSubject<Entry> = new BehaviorSubject(null);
  onEntryAdded = this.onEntryAddedSubject.asObservable();

  private onEntryRemovedSubject: BehaviorSubject<Entry> = new BehaviorSubject(null);
  onEntryRemoved = this.onEntryRemovedSubject.asObservable();

  private onEntryChangedSubject: BehaviorSubject<EntryChange> = new BehaviorSubject(null);
  onEntryChanged = this.onEntryChangedSubject.asObservable();


  private updateEntry(element:Entry): void {
    const e = this.entries.findIndex((e) => e._id === element._id);
    const oldEntry = new Entry(this.entries[e]);
    Entry.updateFromData(this.entries[e],element);


    // ensure we have this category in our list
    if(!this.categories.some(e => e === element.category))
    this.categories.push(element.category);

    // ensure we have this remunerator in our list
    if(!this.remunerators.some(e => e === element.remunerator))
    this.remunerators.push(element.remunerator);

    // notify everyone else
    let change:EntryChange = {old: oldEntry, current: this.entries[e]};
    this.onEntryChangedSubject.next(change);
  }
  private removeEntry(element: Entry): void {
    const e = this.entries.findIndex((e) => e._id === element._id);
    this.entries.splice(e,1);
    this.onEntryRemovedSubject.next(element);
  }
  private addEntry(element: Entry): void {
    this.entries.push(element);
    // ensure we have this category in our list
    if(!this.categories.some(e => e === element.category))
      this.categories.push(element.category);

    // ensure we have this remunerator in out list
    if(!this.remunerators.some(e => e === element.remunerator))
      this.remunerators.push(element.remunerator);

    this.onEntryAddedSubject.next(element);
  }
  private getEntriesFromServer(perPage: number, page: number)
  {
    this.apiService.getEntries(perPage,page).subscribe((e) => {

      if(e)
      {
        this.logService.log("Adding entries ...");

        e.data.forEach(element => {
          let newEntry = new Entry();
          Entry.updateFromData(newEntry, element);

          this.addEntry(newEntry);
        });
        this.logService.log(this.entries.length);
        if(e.total > (perPage * page))
        {
          this.getEntriesFromServer(perPage, page+1);
        }
      }else
      {
        this.logService.log("no entries received. Error?");
      }
    });
  }
  public deleteEntry(data: Entry) {
    this.apiService.deleteEntry(data).subscribe((e) => {
      if(e){
        this.removeEntry(e);
      }
    });
  }

  public createEntry(data: Entry) {

    this.apiService.addEntry(data).subscribe((e) => {
      if(e){
        let newEntry = new Entry();
        Entry.updateFromData(newEntry, e);
        this.addEntry(newEntry);
      }
    });
  }

  public putEntry(data: Entry) {
    this.apiService.putEntry(data).subscribe((e) => {
      if(e) {
        this.updateEntry(e);
      }
    })
  }
}
