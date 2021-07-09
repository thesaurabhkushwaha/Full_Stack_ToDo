import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }
  authenticate(username, password): boolean {
    if (username === 'Saurabh' && password === 'dummy') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem('authenticatedUser')
  }
}
