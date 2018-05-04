import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  email:string = ''
  passwordApi:string = ''
  itemRef: AngularFireObject<any>;


  constructor(private as: AuthenticationService, private router: Router, db: AngularFireDatabase, public snackBar: MatSnackBar) { 

  	if (this.as.authenticated) {
        this.itemRef = db.object('personalData/'+this.as.currentUserId);
        this.itemRef.snapshotChanges().subscribe(data => {
        	this.email = this.as.currentUsermail

        })

  	} else {
  		this.router.navigateByUrl('login-fb');
  	}

  	
  }

  ngOnInit() {
  }

  onSubmit(email,passwordApi){
  	console.log(email)
  	console.log(passwordApi)
    localStorage.setItem('emailApi', email)
    localStorage.setItem('passwordApi', passwordApi)
    this.snackBar.open('Api setting correctly', '', {
      duration: 2000,
    });
  }

}
