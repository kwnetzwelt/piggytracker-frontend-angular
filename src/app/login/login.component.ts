import { Component, OnInit, Inject } from '@angular/core';
import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  popup: Window;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    window.addEventListener('message', (e) => this.updateAuthInfo(e));
  }

  updateAuthInfo(event: any) {
    this.authService.stage3(event.data);
    this.popup.close();
  }

  startSSO(): void {
    this.popup = window.open(this.configService.ssoUrl(), 'ssoauth', 'width=350,height=500');
  }

}
