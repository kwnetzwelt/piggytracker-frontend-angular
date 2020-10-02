import { Component, OnInit, Inject } from '@angular/core';
import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';
import { LogService } from '../log.service';

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
    private logService: LogService,
  ) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    window.removeEventListener('message', this.updateAuthInfo.bind(this));

  }
  updateAuthInfo(event: any) {
    this.logService.log(event);
    this.authService.stage3(event.data);
    this.popup.close();
  }

  startSSO(): void {
    window.addEventListener('message', this.updateAuthInfo.bind(this));
    this.popup = window.open(this.configService.ssoUrl(), 'ssoauth', 'width=350,height=500');
  }

}
