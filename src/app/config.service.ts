import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, ObservableInput } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public locale = '';
  public currency = '';
  public baseUrl = '';
  public apiEndpoint = '';
  public googleClientId = '';
  public staticAssets = '';
  protected externalSsoUrl = '';
  protected externalSsoClientId = '';
  protected externalSsoRedirectUri = '';

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

  /**
   * Generates a random string as state.
   */
  static generateAndSaveState(): string {
    let r = 'auth-';
    for (let i = 0; i < 25; i++) {
      r += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    return r;
  }

  public initWithValues(other: ConfigService) {
    this.baseUrl = other.baseUrl;
    this.apiEndpoint = other.apiEndpoint;
    this.googleClientId = other.googleClientId;
    this.staticAssets = other.staticAssets;
    this.locale = other.locale;
    this.currency = other.currency;
    this.externalSsoUrl = other.externalSsoUrl;
    this.externalSsoClientId = other.externalSsoClientId;
    this.externalSsoRedirectUri = other.externalSsoRedirectUri;
  }

  public ssoUrl(): string {
    return this.baseUrl + '/auth/sso';
  }

  constructor() { }
}
