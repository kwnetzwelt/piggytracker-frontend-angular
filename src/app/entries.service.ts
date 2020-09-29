import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LogService } from './log.service';
import { isBuffer } from 'util';
import { HttpClient } from '@angular/common/http';
import { ApiService, Entry } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  private perPage: number = 20;
  public entries: Entry[] = [];
  public categories: string[] = [];
  public remunerators: string[] = [];

  constructor(private authService: AuthService, private logService: LogService, private apiService: ApiService) {
    this.authService.getLoggedIn.subscribe((v) => {
      this.logService.log("logged in! getting entries");
      if(v)
      this.getEntriesFromServer(this.perPage,1); // fetch each entry individually TODO: User perPage in the future
    });
  }

  private onEntryAddedSubject: BehaviorSubject<Entry> = new BehaviorSubject(null);
  onEntryAdded = this.onEntryAddedSubject.asObservable();

  private onEntryRemovedSubject: BehaviorSubject<Entry> = new BehaviorSubject(null);
  onEntryRemoved = this.onEntryRemovedSubject.asObservable();

  private onEntryChangedSubject: BehaviorSubject<Entry> = new BehaviorSubject(null);
  onEntryChanged = this.onEntryChangedSubject.asObservable();


  private updateEntry(element:Entry): void {
    const e = this.entries.findIndex((e) => e._id === element._id);
    Entry.updateFromData(this.entries[e],element);
    this.onEntryChangedSubject.next(this.entries[e]);


    // ensure we have this category in our list
    if(!this.categories.some(e => e === element.category))
      this.categories.push(element.category);

    // ensure we have this remunerator in out list
    if(!this.remunerators.some(e => e === element.remunerator))
      this.remunerators.push(element.remunerator);

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
          this.addEntry(element);
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
        this.addEntry(e);
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
