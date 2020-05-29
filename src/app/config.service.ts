import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, ObservableInput } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public baseUrl = "";
  public apiEndpoint = "";
  public googleClientId = "";

  public initWithValues(other: ConfigService)
  {
    this.baseUrl = other.baseUrl;
    this.apiEndpoint = other.apiEndpoint;
    this.googleClientId = other.googleClientId;
  }

  constructor() { }

  public static load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get('assets/config.json')
         .pipe(
           map((x: ConfigService) => {
             config.initWithValues(x);
             resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             resolve(false);
             return of({});
           })
         ).subscribe();
    });
  };
}
}
