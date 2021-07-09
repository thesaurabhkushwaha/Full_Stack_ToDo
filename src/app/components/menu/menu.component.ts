import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/services/basic-AuthenticationService';
import { HardcodedAuthenticationService } from 'src/app/services/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  onLoginPage: boolean;
  //isLoggedIn:boolean;
  constructor(public authenticationService: BasicAuthenticationService, private route:ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    //this.isLoggedIn = this.hardcodedAuthenticationService.isLoggedIn();
  }

}
