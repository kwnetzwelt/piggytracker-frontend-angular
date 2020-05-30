import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LogService } from './log.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private gapiSetup: boolean = false; // marks if the gapi library has been loaded
  private authInstance: gapi.auth2.GoogleAuth;
  private error: string;
  public user: gapi.auth2.GoogleUser;


  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  getLoggedIn = this.loggedInSubject.asObservable();
  private setLoggedIn = (value: boolean) => {
    this.loggedInSubject.next(value);
  }

  constructor(private http: HttpClient, private log:LogService, private config: ConfigService) {


  }

  logout(): void
  {
    this.authInstance.signOut();
    this.setLoggedIn(false);
  }

  login(username: string, password: string)
  {
    return this.http.post<any>(this.config.baseUrl + "/login", {username, password})
  }

  async restoreLoginState(){
    if (await this.checkIfUserAuthenticated()) {
      this.log.log("User Authentication restored. ");
      this.user = this.authInstance.currentUser.get();
      this.setLoggedIn(true);
    }else
    {
      this.log.log("User Authentication not restored. ");
    }
  }





  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: this.config.googleClientId })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }
  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {
          this.user = user;
          this.setLoggedIn(true);
        },
        error => {
          this.error = error;
          this.setLoggedIn(false);
        });
    });
  }
  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }
}
