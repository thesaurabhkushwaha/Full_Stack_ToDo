import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BasicAuthenticationService } from 'src/app/services/basic-AuthenticationService';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HardcodedAuthenticationService } from 'src/app/services/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "Saurabh";
  password = "dummy";
  errorMessage = "Invalid credentials";
  invalidLogin = false;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router,
    //public hardcodedAuthenticationService: HardcodedAuthenticationService,
    public basicAuthenticationService: BasicAuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar) { }

  handleJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
      response => {
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false;

      },
      error => {
        this.invalidLogin = true;
        this.snackBar.open("INVALID CREDENTIALS","Close")._dismissAfter(5000);
      }
    )
  }

  ngOnInit(): void {
  }

  // handleBasicAuthLogin() {
  //   this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe(
  //     response => {
  //       this.router.navigate(['welcome', this.username])
  //       this.invalidLogin = false;
  //     },
  //     error => {
  //       this.invalidLogin = true;
  //     }
  //   )
  // }

}
