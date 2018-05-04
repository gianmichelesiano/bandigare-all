import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Router } from "@angular/router";
import { AuthenticationService } from './authentication.service';
import * as firebase from 'firebase';


@Injectable()
export class AuthApiService {

  authObject: any = null;
  uid:string
  itemRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase, private as: AuthenticationService) {

  		this.itemRef = db.object('personalData/'+this.as.currentUserId+'/');
  		this.itemRef.snapshotChanges().subscribe( res => {
  			console.log('servizio')
  			for(var key in  res.payload.val()) {
			    var value =  res.payload.val()[key];
			}
			console.log(value)
			this.authObject = value


  		})

  }

  get userApiEmail(): string {
    return this.authObject.email;
  }

  get userApiPassword(): string {
    return this.authObject.passwordApi;
  }
}