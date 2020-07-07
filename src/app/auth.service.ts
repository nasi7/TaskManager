import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('userToken');
    // Check whether the token is present and return
    // true or false
    return !(token == null);
  }
}
