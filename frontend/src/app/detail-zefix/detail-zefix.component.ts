import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import {AppSettings} from '../appSettings';
import {AuthAPI} from '../auth.api';

interface zefixInterfaceDetails {
  name: string ;
}


@Component({
  selector: 'app-detail-zefix',
  templateUrl: './detail-zefix.component.html',
  styleUrls: ['./detail-zefix.component.css']
})
export class DetailZefixComponent implements OnInit {
  
  chid:any
  urlZefixDetails : string
  retObjDetails : zefixInterfaceDetails = {
  	name : ''
  }

  constructor(private route: ActivatedRoute, private http:Http, public aAPI: AuthAPI) {

  	this.chid = this.route.snapshot.params['chid'];
  	console.log("this.chid")
  	console.log(this.chid)
  	console.log("this.chid")

   

  	this.urlZefixDetails =  AppSettings.API_ENDPOINT+'dms/zefix/v1.0/CompanyDetail?chid='+ this.chid
  	this.http.get(this.urlZefixDetails, this.aAPI.getHeaderOpts())
           .subscribe(data => {
   			this.retObjDetails = JSON.parse(data['_body'])
   			console.log(this.retObjDetails);
   }); 

   }



  ngOnInit() {
  }

}



