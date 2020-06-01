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

  private getEntriesFromServer(perPage: number, page: number)
  {
    this.apiService.getEntries(perPage,page).subscribe((e) => {
      if(e)
      {
        this.logService.log("Adding entries ...");
        e.data.forEach(element => {
          this.entries.push(element);
          this.onEntryAddedSubject.next(element);
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
}
