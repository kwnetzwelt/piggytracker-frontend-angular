import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { LogService } from './log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'piggytracker';
  isLoggedIn = false;
  username: String = "";
  avatarUrl: String = undefined;

  navLinks = [
    {
      routerLink: '/entries',
      label: "Entries",
      icon: "receipt"
    },
    {
      routerLink: '/targets',
      label: "Targets",
      icon: "account_balance"
    },
    {
      routerLink: '/ranking',
      label: "Ranking",
      icon: "monetization_on"
    },
  ];


  constructor(private authService: AuthService, private logService: LogService) { }

  public opened: boolean;
  async ngOnInit(){

    this.authService.getLoggedIn.subscribe((v) =>{
      this.isLoggedIn = v;
      if(v)
      {
        const profile = this.authService.user.getBasicProfile();
        this.username = profile.getName();
        this.avatarUrl = profile.getImageUrl();
      }
      this.logService.log("app.component " + v);
    });
    await this.authService.restoreLoginState();
  }
  handleLoginClicked(){
    this.authService.authenticate();
  }
  handleLogoutClicked(){
    this.authService.logout();
  }
}
