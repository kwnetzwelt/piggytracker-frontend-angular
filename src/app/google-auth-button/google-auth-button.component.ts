import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-google-auth-button',
  templateUrl: './google-auth-button.component.html',
  styleUrls: ['./google-auth-button.component.scss']
})
export class GoogleAuthButtonComponent implements OnInit {
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {


  }
  async authenticate() {
    await this.authService.authenticate("google");
  }
  async checkIfUserAuthenticated(): Promise<boolean> {
    return await this.authService.checkIfUserAuthenticated();
  }
}
