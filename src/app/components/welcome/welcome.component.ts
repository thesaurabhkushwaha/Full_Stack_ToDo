import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from 'src/app/services/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message : String = "";
  name ='';
  response='';
  constructor(private route:ActivatedRoute, private welcomeDataService:WelcomeDataService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }
  getWelcomeMessage(){

    this.welcomeDataService.welcomeMessage().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithName(){
    
    this.welcomeDataService.welcomeMessageWithName(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    
  }

  handleSuccessfulResponse(response){
      this.message = response.message;
  }

  handleErrorResponse(error){
    this.message = error.error.message;
  }
}
