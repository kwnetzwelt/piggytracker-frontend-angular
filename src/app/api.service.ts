import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { LogService } from './log.service';


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

export interface GetEntriesResponse {
  data: Entry[],
  page: number,
  total: number
}
export class EntryRequest {

  _id: string;
  date: string;
  value: Number;
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
    this.updatedAt = data.updatedAt?.toISOString().substr(0,10);
    this.createdAt = data.createdAt?.toISOString().substr(0,10);
    this.deletedAt = data.deletedAt?.toISOString().substr(0,10);
  }
}

export class Entry {
  public static updateFromData(target: Entry, newdata: Entry): void {

    target.date = new Date(newdata.date);
    target.value = newdata.value;
    target.remunerator = newdata.remunerator;
    target.category = newdata.category;
    target.info = newdata.info;
    target.updatedAt = newdata.updatedAt;
    target.createdAt = newdata.createdAt;
    target.deletedAt = newdata.deletedAt;
  }
  _id: string;
  date: Date;
  value: number;
  remunerator: string;
  category: string;
  info: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;

  constructor ()
  {
    this.date = new Date();
    this.value = 15.0;
  }
}
