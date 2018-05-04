import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public af: AngularFireAuth,private router: Router) {

  	 this.af.auth.signOut;
     console.log('logged out');
     this.router.navigateByUrl('/login');
     console.log(this.af.authState)
  }

  ngOnInit() {
  }

}
