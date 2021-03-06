import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LogService } from './log.service';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private gapiSetup = false; // marks if the gapi library has been loaded
  private authInstance: gapi.auth2.GoogleAuth;
  private tokenResponse: TokenResponse;
  public user: gapi.auth2.GoogleUser;

  private userProfile: UserProfile;

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  getLoggedIn = this.loggedInSubject.asObservable();
  private setLoggedIn = (value: boolean) => {
    this.loggedInSubject.next(value);
  }

  constructor(
    private http: HttpClient,
    private logService: LogService,
    private configService: ConfigService
  ) {
    this.userProfile = new UserProfile();
  }

  getUserProfile(): UserProfile {
    return this.userProfile;
  }

  updateUserProfile(newProfile: UserProfileInterface) {
    this.userProfile.fullname = newProfile.fullname;
    this.userProfile.username = newProfile.username;
    this.userProfile.groupId = newProfile.groupId;
    this.userProfile.groupName = newProfile.groupName;
    this.userProfile.avatarUrl = newProfile.avatarUrl;
    this.userProfile.id = newProfile.id;
    this.userProfile.groupId = newProfile.groupId;
    this.userProfile.groupName = newProfile.groupName;
  }

  getAuthHeader(contentType?:string): HttpHeaders {
    return new HttpHeaders({
      "content-type": contentType ?? "application/json",
      "Authorization": "Bearer " + this.tokenResponse.token });
  }

  logout(): void {
    this.authInstance.signOut();
    this.setLoggedIn(false);
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.configService.baseUrl + '/login', { username, password })
  }

  restoreLoginState() {
    if (this.checkIfUserAuthenticated()) {
      this.logService.log('User Authentication restored. ');
      this.user = this.authInstance.currentUser.get();
      this.tokenResponse = this.restoreTokenResponse();
      if (!this.tokenResponse) {
        // init stage 2
        this.stage2();
      } else {
        this.logService.log('restore: ' + this.tokenResponse);
        this.updateUserProfile(this.tokenResponse.userProfile as UserProfileInterface);
        this.setLoggedIn(true);
      }
    } else {
      this.logService.log('User Authentication not restored. ');
    }
  }

  gapiInit():void {
    this.logService.log("gapi.auth2.init");
    gapi.auth2
      .init({ client_id: this.configService.googleClientId })
      .then(auth => {
        this.logService.log("initiated");
        this.gapiSetup = true;
        this.authInstance = auth;
        this.authInstance.signIn().then( () => this.restoreLoginState());
      });
  }

  initGoogleAuth(){
    this.logService.log("initGoogleAuth");
    
    gapi.load('auth2', {
      callback: () => {this.gapiInit();}, 
      onerror: () => {this.logService.log("error")}
    });
    
  }

  stage2() {
    this.logService.log('Stage2');
    let stage2 = this.http.post<TokenResponse>(this.configService.baseUrl + '/google/tokensignin', {
      idtoken: this.user.getAuthResponse().id_token,
      avatarUrl: this.user.getBasicProfile().getImageUrl(),
    }, {
      headers: {
        contentType: 'application/x-www-form-urlencoded'
      }
    }).pipe(catchError(this.handleError<TokenResponse>('authError')));
    stage2.subscribe((result) => {
      this.logService.log('Stage2 complete');
      this.stage3(result);
    });
  }

  stage3(result: TokenResponse) {
    this.storeTokenResponse(result);
    this.logService.log('store: ' + result.token);
    this.logService.log(result);
    this.updateUserProfile(result.userProfile);
    this.setLoggedIn(true);
  }

  async authenticate(provider: string): Promise<void> {
    if (provider === 'sso') {
      return new Promise(() => {
        console.log('sso');
      });
    }

    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {
          this.user = user;
          this.stage2();
        },
        error => {
          this.setLoggedIn(false);
        });
    });
  }

  restoreTokenResponse(): TokenResponse {
    const storedValue = localStorage.getItem('tokenResponse');
    if (storedValue) {
      return JSON.parse(storedValue) as TokenResponse;
    }
    return null;
  }

  storeTokenResponse(response: TokenResponse): void {
    if (response) {
      localStorage.setItem('tokenResponse', JSON.stringify(response));
      this.tokenResponse = response;
    } else {
      localStorage.removeItem('tokenResponse');
    }
  }

  checkIfUserAuthenticated():boolean {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      this.initGoogleAuth();
      return false;
    }
    else
    {
      return this.authInstance.isSignedIn.get();
    }
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

export class UserProfile implements UserProfileInterface {
  fullname: string;
  username: string;
  groupId: string;
  groupName: string;
  avatarUrl: string;
  id: string;
}

export interface UserProfileInterface {
  fullname: string;
  username: string;
  groupId: string;
  groupName: string;
  avatarUrl: string;
  id: string;
}

export interface TokenResponse {
  message: string,
  token: string,
  userProfile: UserProfileInterface,
}
