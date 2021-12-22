import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LogService } from './log.service';
import { Router } from '@angular/router';
import { UpdateService } from './update.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ImportExportDialogComponent } from './import-export-dialog/import-export-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

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
    {
      routerLink: '/stats',
      label: 'Stats',
      icon: 'monetization_on'
    }
  ];


  constructor(
    private updateService: UpdateService,
    private authService: AuthService,
    private logService: LogService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
  ) { }

  async ngOnInit() {
    this.updateService.init();
    this.authService.getLoggedIn.subscribe((v) => {
      this.isLoggedIn = v;
      if (v) {
        const profile = this.authService.user.getBasicProfile();
        this.username = profile.getName();
        this.avatarUrl = profile.getImageUrl();
        this.router.navigate(["/entries"]);
      }
      this.logService.log('app.component ' + v);
    });
    
  }

  handleLoginClicked() {
    this.router.navigate(['/login']);
  }

  handleLogoutClicked() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  hangleImportExportClicked() {

    let ref = this.bottomSheet.open(ImportExportDialogComponent);
  }
  handleSettingsClicked() {
    let ref = this.bottomSheet.open(SettingsDialogComponent);
  }
}
