import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LogService } from './log.service';
import { Router } from '@angular/router';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'piggytracker';
  isLoggedIn = false;
  username = '';
  avatarUrl: string = undefined;
  public opened: boolean;

  navLinks = [
    {
      routerLink: '/entries',
      label: 'Entries',
      icon: 'receipt'
    },
    {
      routerLink: '/targets',
      label: 'Targets',
      icon: 'account_balance'
    },
    {
      routerLink: '/ranking',
      label: 'Ranking',
      icon: 'monetization_on'
    },
  ];


  constructor(
    private updateService: UpdateService,
    private authService: AuthService,
    private logService: LogService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.updateService.init();
    this.authService.getLoggedIn.subscribe((v) => {
      this.isLoggedIn = v;
      if (v) {
        const profile = this.authService.user.getBasicProfile();
        this.username = profile.getName();
        this.avatarUrl = profile.getImageUrl();
      }
      this.logService.log('app.component ' + v);
    });
    await this.authService.restoreLoginState();
  }

  handleLoginClicked(provider: string) {
    if (provider === 'g') {
      this.authService.authenticate(provider);
    } else {
      this.router.navigate(['/login']);
    }
  }

  handleLogoutClicked() {
    this.authService.logout();
  }
}
