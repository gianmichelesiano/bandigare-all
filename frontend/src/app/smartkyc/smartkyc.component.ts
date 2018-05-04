import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {Subscription} from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import { AuthenticationService } from '../authentication.service';
import {AuthAPI} from '../auth.api';




interface smartKyc {
  // for person
  id?: string;
  entityType: string ;
  maxResults: number;
  // externalID: string;
  // batchID: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  // gender: string;
  // alias: string;
  // birthdate: string;
  // cityOfBirth: string; 
  // countryOfBirth: string;
  // countryOfCitizenship: string;
  // countryOfResidence: string;
  // companyAffiliations: string;
  // otherKeywords: string;


  //for company
  organization_name: string;
  organization_country: string;
}


@Component({
  selector: 'app-smartkyc',
  templateUrl: './smartkyc.component.html',
  styleUrls: ['./smartkyc.component.css']
})



export class SmartkycComponent  {

  countries = AppSettings.COUNTRY


  urlStatus = '';
  urlOverview = '';
  entityID = '';
  firstName = '';
  lastName = '';
  gender = '';
  countryOfResidence = '';
  riskResult = '';
  adverseNewsRisk = '';
  HighRiskCountriesRisk = '';
  LegalRisk = '';
  PoliticalExposureRisk = '';
  SensitiveIndustriesRisk = '';
  SustainabilityRiskIndustries = '';
  otherMedia = '';
  organization_name = ''
  organization_country = ''
  retObj: any;
  busy: Subscription;
  error:any

  url_smart : string
  model : smartKyc = {
  					  entityType:'', 
  					  maxResults:100,
  					  first_name:'',
              middle_name:'',
  					  last_name:'',
              organization_name:'',
              organization_country :''
  					 };

  itemsSMARTKYC: AngularFireList<any>;
  
  smartKyCItems: Observable<any[]>;
  constructor(private http:Http, db: AngularFireDatabase, public as:AuthenticationService, public aAPI: AuthAPI) {
  	this.model.entityType = 'PER'
    this.smartKyCItems = db.list('smartKYC').valueChanges().map( (arr) => { return arr.reverse(); } );;
    this.itemsSMARTKYC = db.list('monitor');
   }

  cerca(model){
    let search = ''
    console.log(this.model.entityType)
    if (this.model.entityType == 'PER'){
        this.url_smart = AppSettings.API_ENDPOINT+'dms/smartkyc/v1.0/api?entity=PER&first_name='+ model.first_name +'&last_name='+model.last_name+'&middle_name='+model.middle_name
        search = model.first_name +' '+model.last_name+' '+model.middle_name
    }

    if (this.model.entityType == 'ORG'){
        this.url_smart = AppSettings.API_ENDPOINT+'dms/smartkyc/v1.0/api?entity=ORG&organization_name='+ model.organization_name +'&organization_country='+model.organization_country
        search = model.organization_name +' '+model.organization_country
    }
    
    
    this.busy = this.http.get(this.url_smart, this.aAPI.getHeaderOpts())
          .subscribe(data => {
          this.retObj = JSON.parse(data['_body'])
         },
         (err) => (this.error = err)
         ); 
  }

}
