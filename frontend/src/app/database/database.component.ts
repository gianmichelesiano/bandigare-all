import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent {
  results: any[];
  constructor(private http:Http) { 

  	  this.http.get('http://127.0.0.1:5000/dms/db/v1.0?method=Select&query=SELECT%20*%20FROM%20users')
      .subscribe(data => {
      		//console.log(data);
      		this.results = JSON.parse(data['_body'])['results']
      		console.log(this.results)
      	});

  }
}
