import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppSettings} from '../appSettings';
import {AuthAPI} from '../auth.api';

interface companyHouseSearch {
  company_name: string;
}

@Component({
  selector: 'app-company-house',
  templateUrl: './company-house.component.html',
  styleUrls: ['./company-house.component.css']
})
export class CompanyHouseComponent implements OnInit {

  constructor(private http:Http, private route: ActivatedRoute, private router: Router, public aAPI: AuthAPI) { }

  items_per_page = 0
  total_results = 0
  message = ''
  
  retObj: any = null;
  retVal: any = null;
  retObjDetails : any = null;
  urlCompanyHouse : string = ''
  urlCompanyHouseDetails : string = ''
  result : string = ''
  busy: Subscription;
  model : companyHouseSearch = {
  					  company_name:'',
  					 };



  ngOnInit() {
  }

  findCompanyHouse(model){
  	console.log(model)
    this.urlCompanyHouse = AppSettings.API_ENDPOINT+'dms/companyHouse/v1.0/SearchByName?company_name='+ model.company_name
    console.log(this.urlCompanyHouse)
    this.busy = this.http.get(this.urlCompanyHouse, this.aAPI.getHeaderOpts())
           .subscribe(data => {
           this.retVal = JSON.parse(data['_body'])
           this.result = this.retVal['result']
           this.retObj = this.retVal['response'][1]['items']

           this.items_per_page = this.retVal['response'][1]['items_per_page']
           this.total_results = this.retVal['response'][1]['total_results']
           console.log(this.retVal)
           if (this.total_results >= this.items_per_page){
           	this.message = 'Here are displayed ' + this.items_per_page +   ' of ' +this.total_results + ' results found'
           } else {
           	 this.message = 'Here are displayed ' + this.total_results + ' results'
           }
           	
           console.log(this.message)
     }); 
  }

  detailsClick(chid){
  	console.log(chid)
  	console.log('must be implemented')
  }
}
