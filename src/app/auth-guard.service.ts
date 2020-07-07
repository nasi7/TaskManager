import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      window.alert('You are not logged in! \n Click OK to go to login screen');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
