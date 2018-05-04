import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthAPI {

	  constructor() { }

	  getHeaderOpts(){
	     var headers = new Headers();
	     var opts = new RequestOptions();
	     let username = localStorage.getItem('emailApi')
	     let password = localStorage.getItem('passwordApi')
	     headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
	     opts.headers = headers;    
	     return opts
	  }
}