import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntriesComponent } from './entries/entries.component';
import { TargetsComponent } from './targets/targets.component';
import { WastrelsComponent } from './wastrels/wastrels.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'entries', component: EntriesComponent},
  {path: 'targets', component: TargetsComponent},
  {path: 'wastrels', component: WastrelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
