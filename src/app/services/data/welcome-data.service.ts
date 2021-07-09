import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message: String) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  welcomeMessage() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/helloworld/'); //This is an Observable so it must be subscribed 
  }

  welcomeMessageWithName(name) {
    let basicAuthHeadString = this.createBasicAuthenticationHttpHeader();
    let headers = new HttpHeaders({ Authorization: basicAuthHeadString })
    return this.http.get<HelloWorldBean>(`http://localhost:8080/helloworld/${name}`, { headers });
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'Saurabh';
    let password = 'dummy';
    let authString = 'Basic ' + window.btoa(username + ':' + password);
    return authString;
  }
}
