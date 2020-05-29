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
  constructor(private authService: AuthService, private logService: LogService) { }

  async ngOnInit(){
    this.authService.getLoggedIn.subscribe((v) =>{
      this.isLoggedIn = v;
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
