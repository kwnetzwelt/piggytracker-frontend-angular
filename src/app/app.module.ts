import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import de from '@angular/common/locales/de';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(de);
registerLocaleData(en);
registerLocaleData(es);
registerLocaleData(fr);

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//piggytracker
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { EntriesComponent } from './entries/entries.component';
import { TargetsComponent } from './targets/targets.component';
import { WastrelsComponent } from './wastrels/wastrels.component';
import { GoogleAuthButtonComponent } from './google-auth-button/google-auth-button.component';
import { AuthService } from './auth.service';
import { LogService } from './log.service';
import { ConfigService } from './config.service';
import { RemuneratorPipe } from './remunerator.pipe';
import { InitialsPipe } from './initials.pipe';
import { CategoryPipe } from './category.pipe';

//material
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule} from '@angular/material/divider';
import { MatChipsModule} from '@angular/material/chips/';
import { MatSidenavModule } from '@angular/material/sidenav';

//additional
import {BottomNavModule} from 'ngx-bottom-nav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarComponent } from './avatar/avatar.component';
import { EntriesService } from './entries.service';
import { ListentryComponent } from './listentry/listentry.component';
import { RemuneratorComponent } from './remunerator/remunerator.component';
import { CategoryComponent } from './category/category.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { VersionComponent } from './version/version.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntriesComponent,
    TargetsComponent,
    WastrelsComponent,
    GoogleAuthButtonComponent,
    AvatarComponent,
    ListentryComponent,
    RemuneratorComponent,
    CategoryComponent,
    RemuneratorPipe,
    InitialsPipe,
    CategoryPipe,
    WelcomeComponent,
    VersionComponent,

  ],
  imports: [

    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    //material
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ScrollingModule,
    MatDividerModule,
    MatChipsModule,
    MatSidenavModule,

    //additional
    BottomNavModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: LOCALE_ID, deps: [ConfigService], useFactory: (configService: ConfigService) => { return configService.locale; } },
    {
    provide: APP_INITIALIZER,
    useFactory: ConfigService.load,
    deps: [
      HttpClient,
      ConfigService
    ],
    multi: true
  }, AuthService, LogService, EntriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
