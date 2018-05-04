import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(public as: AuthenticationService) { 
  	console.log("as.authState")
  	console.log(as.authenticated)

  }

  ngOnInit() {
  }

}
