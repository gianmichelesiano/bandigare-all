import { Component, HostBinding, OnInit  } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { WindowService } from '../window.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  state: string = '';
  error: any;
  windowRef: any;

  constructor(private win: WindowService, public af: AngularFireAuth,private router: Router) { 
  }

  ngOnInit() {
  }

  onSubmit(formData) {
  	if(formData.valid){ 
  		console.log(formData.value);
  	}
  }
}
