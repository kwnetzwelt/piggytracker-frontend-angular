import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntriesComponent } from './entries/entries.component';
import { TargetsComponent } from './targets/targets.component';
import { WastrelsComponent } from './wastrels/wastrels.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'entries', component: EntriesComponent, canActivate: [AuthGuardGuard]},
  {path: 'targets', component: TargetsComponent, canActivate: [AuthGuardGuard]},
  {path: 'ranking', component: WastrelsComponent, canActivate: [AuthGuardGuard]},
  {path: '', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
