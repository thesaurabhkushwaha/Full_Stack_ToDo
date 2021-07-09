import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
export class AuthenticationBean {
  constructor(public message: String) {
  }
}

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }


  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(`${API_URL}/authenticate`, { username, password }).pipe( //GET is more meaningful here
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
        }
      )
    );
  }

  isLoggedIn(): boolean {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem(TOKEN);
  }

  executeAuthenticationService(username, password) {

    let authString = 'Basic ' + window.btoa(username + ':' + password);
    let headers = new HttpHeaders({ Authorization: authString })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, { headers }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, authString);
          return data;
        }
      )
    );
  }

  // createBasicAuthenticationHttpHeader() {
  //   let username = 'Saurabh';
  //   let password = 'dummy';
  //   let authString = 'Basic ' + window.btoa(username + ':' + password);
  //   return authString;
  // }
}
