import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AppSettings} from '../appSettings';
import {AuthAPI} from '../auth.api';


interface twitterSearch {
  id?: string;
  first_name: string;
  last_name: string;

}

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  loginForm: FormGroup;
  twitterForm: FormGroup;


  retObj: Array<any> = [];
  urlTwitter : string = ''
  error: any;
  textSeatch : string = ''
  busy: Subscription;
  model : twitterSearch = {
  					  first_name:'',
  					  last_name:''
  					 };
  constructor(private http:Http, public aAPI: AuthAPI) { }

  ngOnInit() {
     this.createTwitterForm();
  }

  private createTwitterForm() {
    this.twitterForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    })
     
  }



  testForm() {
    console.log(this.loginForm.value);
  }

  findTwitterTest(){
    console.log(this.twitterForm.value);
  }

  findTwitter(){

    let first_name = this.twitterForm.value['firstName']
    let last_name = this.twitterForm.value['lastName']

    this.retObj = [] 
    this.urlTwitter = AppSettings.API_ENDPOINT+'dms/twitter/v1.0/get?first_name='+ first_name +'&last_name='+last_name
    this.textSeatch = 'Search for: First name= '+ last_name +' Last Name='+last_name 
    console.log(this.urlTwitter)

    this.busy = this.http.get(this.urlTwitter, this.aAPI.getHeaderOpts())
           .subscribe(data => {
           console.log(data);
           this.retObj = JSON.parse(data['_body'])
     },
     (err) => (this.error = err)
     ); 
  }

}
