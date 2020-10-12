import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import de from '@angular/common/locales/de';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { LocaleCurrencyInputModule} from 'locale-currency-input';

registerLocaleData(de);
registerLocaleData(en);
registerLocaleData(es);
registerLocaleData(fr);

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// piggytracker
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

import { StringToColorPipe, StringToForegroundColorPipe } from './stringToColor.pipe';

// material
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips/';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// additional
import { BottomNavModule } from 'ngx-bottom-nav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar/avatar.component';
import { EntriesService } from './entries.service';
import { ListentryComponent } from './listentry/listentry.component';
import { RemuneratorComponent } from './remunerator/remunerator.component';
import { CategoryComponent } from './category/category.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { VersionComponent } from './version/version.component';
import { AddEntryDialogComponent } from './add-entry-dialog/add-entry-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditEntryDialogComponent } from './edit-entry-dialog/edit-entry-dialog.component';
import { RankingService } from './ranking.service';
import { RankingEntrySettingsDialogComponent } from './ranking-entry-settings-dialog/ranking-entry-settings-dialog.component';
import { UpdateService } from './update.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { TargetsService } from './targets.service';
import { TargetImagePipe } from './targetImage.pipe';
import { MonthNamePipe } from './month-name.pipe';


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
    TargetImagePipe,
    StringToColorPipe,
    StringToForegroundColorPipe,
    WelcomeComponent,
    VersionComponent,
    AddEntryDialogComponent,
    EditEntryDialogComponent,
    RankingEntrySettingsDialogComponent,
    LoginDialogComponent,
    MonthNamePipe,
  ],
  imports: [

    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LocaleCurrencyInputModule,

    // material
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ScrollingModule,
    MatDividerModule,
    MatChipsModule,
    MatSidenavModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    // additional
    BottomNavModule,
    FlexLayoutModule,
    FormsModule,
  ],

  entryComponents: [
    AddEntryDialogComponent,
    RankingEntrySettingsDialogComponent,
  ],
  providers: [
    { provide: LOCALE_ID, deps: [ConfigService], useFactory: (configService: ConfigService) => configService.locale },
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigService.load,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }, AuthService, LogService, EntriesService, TargetsService, RankingService, UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
