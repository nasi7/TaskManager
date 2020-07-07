import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'tasks', component: TaskTableComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
