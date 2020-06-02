import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

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

//additional
import {BottomNavModule} from 'ngx-bottom-nav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarComponent } from './avatar/avatar.component';
import { EntriesService } from './entries.service';
import { ListentryComponent } from './listentry/listentry.component';
import { RemuneratorComponent } from './remunerator/remunerator.component';
import { CategoryComponent } from './category/category.component';

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

    //additional
    BottomNavModule,
    FlexLayoutModule,
  ],
  providers: [{
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
