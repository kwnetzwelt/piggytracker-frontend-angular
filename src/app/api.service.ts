import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { LogService } from './log.service';
import { Target, TargetsEntry } from './targets.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private configService: ConfigService,
    private logService: LogService,
    ) { }

  private composeUrl(url: string): string
  {
    return this.configService.baseUrl + this.configService.apiEndpoint + url;
  }

  public putEntry(data: Entry): Observable<Entry> {
    return this.httpClient.put<Entry>(
      this.composeUrl("/bills/" + data._id), new EntryRequest(data),
      {
        headers: this.authService.getAuthHeader(),
      }).pipe(
        catchError(this.handleError<Entry>('putEntry'))
      );

  }

  public deleteEntry(data: Entry): Observable<Entry> {
    return this.httpClient.delete<Entry>(
      this.composeUrl("/bills/" + data._id),
      {
        headers: this.authService.getAuthHeader(),
      }).pipe(
        catchError(this.handleError<Entry>('deleteEntry'))
      );

  }

  public addEntry(data: Entry): Observable<Entry> {


    return this.httpClient.post<Entry>(
      this.composeUrl("/bills"), new EntryRequest(data),
      {
        headers: this.authService.getAuthHeader(),
      }).pipe(
        catchError(this.handleError<Entry>('addEntry'))
      );

  }
  public getEntries(perPage: number = 20, page: number = 1): Observable<GetEntriesResponse> {
    return this.httpClient.get<GetEntriesResponse>(
      this.composeUrl("/bills"),
      {
        headers: this.authService.getAuthHeader(),
        params: new HttpParams().append("perPage",String(perPage)).append("page",String(page)),
      }).pipe(
        catchError(this.handleError<GetEntriesResponse>('getEntries'))
      );

  }

  public getUpdates(updatedMillisecondsAgo: number): Observable<GetUpdatesResponse> {
    return this.httpClient.get<GetUpdatesResponse>(
      this.composeUrl("/updates"),
      {
        headers: this.authService.getAuthHeader(),
        params: new HttpParams().append("updatedMillisecondsAgo",String(updatedMillisecondsAgo)),
      }).pipe(
        catchError(this.handleError<GetUpdatesResponse>("getUpdates"))
      );
  }

  public getTargets(perPage: number = 20, page: number = 1): Observable<GetTargetsResponse> {
    return this.httpClient.get<GetTargetsResponse>(
      this.composeUrl("/targets"),
      {
        headers: this.authService.getAuthHeader(),
        params: new HttpParams().append("perPage",String(perPage)).append("page",String(page)),
      }).pipe(
        catchError(this.handleError<GetTargetsResponse>('getEntries'))
      );

  }

  public putTarget(target:TargetEntry):Observable<TargetEntry> {
    return this.httpClient.put<TargetEntry>(
      this.composeUrl("/targets/" + target._id), target,
      {
        headers: this.authService.getAuthHeader(),
      }).pipe(
        catchError(this.handleError<TargetEntry>('putTargetEntry'))
      );
  }
  public postTarget(target:TargetEntry):Observable<TargetEntryRequest> {
    let dataToSend = new TargetEntryRequest(target);

    return this.httpClient.post<TargetEntryRequest>(
      this.composeUrl("/targets"), dataToSend,
      {
        headers: this.authService.getAuthHeader(),
      }).pipe(
        catchError(this.handleError<TargetEntryRequest>('addTargetEntry'))
      );

  }

  public getRemunerators(): Observable<RemuneratorEntriesResponse> {
    return this.httpClient.get<RemuneratorEntriesResponse> (
      this.composeUrl("/remunerator"),
      {
        headers: this.authService.getAuthHeader()
      }).pipe(
        catchError(this.handleError<RemuneratorEntriesResponse>('getRemunerators'))
      );
    }


  public postRemunerator(data: RemuneratorEntry): Observable<RemuneratorEntryRequest> {


    return this.httpClient.post<RemuneratorEntryRequest>(
      this.composeUrl("/remunerator"), new RemuneratorEntryRequest(data),
      {
        headers: this.authService.getAuthHeader(),
      }).pipe(
        catchError(this.handleError<RemuneratorEntryRequest>('postRemunerator'))
      );

  }

  public export(): Observable<Blob>
  {
    return this.httpClient.get (
      this.composeUrl("/bills/export"),
    {
      headers: this.authService.getAuthHeader(),
      responseType: "blob",
    }).pipe(
      catchError(this.handleError<Blob>("export"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export interface ExportResponse {
  body: any;
  fileName: string
}

export class RemuneratorEntryRequest {
  remunerator:RemuneratorEntry;
  constructor(entry: RemuneratorEntry)
  {
    this.remunerator = entry;
  }
}

export interface RemuneratorEntriesResponse {
  data: RemuneratorEntry[]
}

export interface RemuneratorEntry {
  name: string,
  offset: number
}

export interface TargetTotal {
  value: number;
  category: string;
}
export class TargetEntryRequest {
  _id: string;
  tid: number;
  totals: TargetTotal[];
  constructor(other: TargetEntry)
  {
    if(other._id !== undefined)
      this._id = other._id;
    this.tid = other.tid;
    this.setTotals(other.totals);
  }
  setTotals (newTotals:TargetTotal[]){
    var t = [];
    for (let index = 0; index < newTotals.length; index++) {
        let cleanedUp = {
            value:newTotals[index].value,
            category:newTotals[index].category
        }
        t.push(cleanedUp);
    }
    this.totals = t;
  }
}
export class TargetEntry {
  _id: string;
  tid: number;
  totals: TargetTotal[];

  setTotals (newTotals:Target[]){
    var t = [];
    for (let index = 0; index < newTotals.length; index++) {
        let cleanedUp = {
            value:parseFloat(newTotals[index].targetValue.toString()),
            category:newTotals[index].name
        }
        t.push(cleanedUp);
    }
    this.totals = t;
  }
}

export interface GetTargetsResponse {
  data: TargetEntry[],
  page: number,
  total: number
}

export interface GetEntriesResponse {
  data: Entry[],
  page: number,
  total: number
}

export interface GetUpdatesResponse {
  data: Entry[],

}

export class EntryRequest {

  _id: string;
  date: string;
  value: number;
  remunerator: string;
  category: string;
  info: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
  constructor(data: Entry)
  {
    this._id = data._id;
    this.date = new Date(data.date).toISOString().substr(0,10);
    this.value = parseFloat(data.value.toString());
    this.remunerator = data.remunerator;
    this.category = data.category;
    this.info = data.info;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
    this.deletedAt = data.deletedAt;
  }
}

export class Entry {
  public static updateFromData(target: Entry, newdata: Entry): void {
    target._id = newdata._id;
    target.date = new Date(newdata.date);
    target.value = newdata.value;
    target.remunerator = newdata.remunerator;
    target.category = newdata.category;
    target.info = newdata.info;
    target.updatedAt = newdata.updatedAt;
    target.createdAt = newdata.createdAt;
    target.deletedAt = newdata.deletedAt;
    target.deleted = newdata.deleted;
  }
  _id: string;
  date: Date;
  value: number;
  remunerator: string;
  category: string;
  info: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
  deleted: boolean;

  constructor (existing?: Entry)
  {
    this.date = new Date();
    this.value = 15.0;
    if(existing)
      Entry.updateFromData(this, existing);
  }
}
