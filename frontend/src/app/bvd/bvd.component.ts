import { Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import {Subscription} from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthApiService } from '../authapi.service';
import {AppSettings} from '../appSettings';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

export class bvdCompanyNameSearch { 
    '-9427': string;
    ADDR: string;
    BVDID: string;
    CITY: string;
    CONSCODE: string;
    COUNTRY: string;
    EMPL: string; //probably date
    LASTYEAR: string
    NACECCOD2: string;
    NAME: string;
    OPRE: string;
 }


interface nodeElement {
  id: string;
  label: string;
  title : string;
  group: string;
  value: number
}

interface edgeElement {
  from: string;
  to : string;
  label : string;
  length: number;
  width : number
}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  infoTitle?: string;
  infoDesc?: string;
}


@Component({
  selector: 'app-bvd',
  templateUrl: './bvd.component.html',
  styleUrls: ['./bvd.component.css']
})
export class BvdComponent  {

 markers: marker[]
 nodeElements: nodeElement[]
 edgeElements: edgeElement[]
 nodeSelected: nodeElement[]
 

  sections = AppSettings.SECTIONS

  urlJson : string = ''

  status: number;
  myData: Array<any>;
  bvdPersondata: Array<any>;
  title = 'Deloitte DMS';
  hero = 'DMS API';
  retObj: any;
  error: any;
  companyName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  entityType: string;

  showGraph:number
 
  results: string[];

  busy: Subscription;

  bvdCompanyNameSearch: bvdCompanyNameSearch[] = [];
  bvdSection: any;
  username:string
  password:string
  openJsonVar:boolean
  type:string = 'BVD'

  itemsBVD: AngularFireList<any>;
  

  constructor(private http:Http,  db: AngularFireDatabase, public as:AuthenticationService, private router: Router) {
    this.companyName = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.entityType = 'ORG'
    this.itemsBVD = db.list('monitor')
    this.showGraph = 0

    this.nodeElements = []
    this.edgeElements = []

    this.nodeSelected = []


  }

  getHeaderOpts(){
     var headers = new Headers();
     var opts = new RequestOptions();
     let username = localStorage.getItem('emailApi')
     let password = localStorage.getItem('passwordApi')
     headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
     opts.headers = headers;    
     return opts
  }

  search(companyName,entityType, firstName, middleName, lastName){
     
      this.error = ''
      //search for company
      if (entityType == "ORG"){
              this.urlJson = AppSettings.API_ENDPOINT+'dms/bvd/v1.0/api-company?name='+companyName
              console.log(this.urlJson)
              this.busy = this.http.get(this.urlJson, this.getHeaderOpts())
                .subscribe(data => {
                    this.status = data['status'];
                    this.retObj = JSON.parse(data['_body'])
                    console.log(this.retObj)
                    if (this.retObj['value'] != 'No Company found'){
                       this.bvdCompanyNameSearch =  this.retObj['value']
                    } 
                    

                  },
                  (err) => (this.error = err)
                  );
      }
      //search for person
      if (entityType == "PER"){
               this.urlJson = AppSettings.API_ENDPOINT+'dms/bvd/v1.0/api-person?firstName='+firstName+'&middleName='+middleName+'&lastName='+lastName
               this.busy = this.http.get(this.urlJson,this.getHeaderOpts())
                .subscribe(data => {
                  this.status = data['status'];
                  this.retObj = JSON.parse(data['_body'])
                  this.bvdPersondata = this.retObj['data']
                },
                (err) => (this.error = err)
                );
      } 
  }

  openJson(){
    this.openJsonVar = !this.openJsonVar
  }

  searchByBvdId(bvdId, selectedValue){
      this.urlJson = AppSettings.API_ENDPOINT+'dms/bvd/v1.0/api-section?BVDID='+bvdId+'&section='+selectedValue
      this.busy = this.http.get(this.urlJson, this.getHeaderOpts())
        .subscribe(data => {
          this.status = data['status'];
          this.retObj = JSON.parse(data['_body'])
          this.bvdSection = this.retObj
          console.log(this.retObj)
        },
        (err) => (this.error = err)
        );
  }

  geoInfo(items){
    this.markers = []

    for (let item in items['CONTACTS_MEMBERSHIP_IdCompany']){
      let  label =item
      let  name = items['CONTACTS_MEMBERSHIP_NameCompany'][item]
      let  address = items['CONTACTS_MEMBERSHIP_FullAddressCompany'][item]
      this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyDlrPvrjndKPbJxqLhzcVtLYDXHG6fvaNQ')
                     .subscribe( data => {
                       let tmpLat = JSON.parse(data['_body'])["results"][0]['geometry']["location"]['lat']
                       let tmpLng = JSON.parse(data['_body'])["results"][0]['geometry']["location"]['lng']
                       let ele = { 
                                   lat:tmpLat, 
                                   lng:tmpLng, 
                                   label:label,
                                   infoTitle: name,
                                   infoDesc: name,
                               }

        

                       if (this.containsObject(ele, this.markers)>-1){
                             console.log('successo')
                             let index = this.containsObject(ele, this.markers)
                             console.log(index)
                             let eleExist = this.markers[index]
                             this.markers[index]['infoDesc'] = this.markers[index]['infoDesc'] +', '+ ele['infoDesc']
                             this.markers[index]['infoTitle'] = "Multiple Company"
                             this.markers[index]['label'] = "M"
                             
                       } else {
                           this.markers.push(ele)
                       }
                       console.log(this.markers)
                       
                       // add marker
                     });

        }
     }


    containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if ((list[i]['lat'] === obj['lat']) && (list[i]['lng'] === obj['lng'])) {
                return i;
            }
        }
        console.log('no')
        console.log(obj)
        console.log(list)


        return -1;
    }


    getShareholders(BVDID){


      console.log("getShareholders")
      this.urlJson = AppSettings.API_ENDPOINT+'dms/bvd/v1.0/ShareholdersGraph?BVDID='+BVDID
      console.log(this.urlJson)
      this.busy = this.http.get(this.urlJson, this.getHeaderOpts())
        .subscribe(data => {
          this.status = data['status'];
          this.retObj = JSON.parse(data['_body'])
          this.nodeElements = this.retObj['nodes']
          this.edgeElements = this.retObj['edges']
          this.showGraph = this.nodeElements.length
          if (this.showGraph == 0){
              this.showGraph = -1;
          }
        },
        (err) => (this.error = err)
        )           
    }



    getShareholdersSingle(BVDID){
      console.log("getShareholdersSingle")
      this.urlJson = AppSettings.API_ENDPOINT+'dms/bvd/v1.0/getShareholdersSingleGraph?BVDID='+BVDID
      console.log(this.urlJson)
      this.busy = this.http.get(this.urlJson, this.getHeaderOpts())
        .subscribe(data => {
          this.status = data['status'];
          this.retObj = JSON.parse(data['_body'])
          this.nodeElements = this.retObj['nodes']
          this.edgeElements = this.retObj['edges']
          console.log(this.nodeElements.length)
          console.log(this.edgeElements.length)
          this.showGraph = this.nodeElements.length
          var present = ["Main Company", "Natural Person", "Company Shareholder", "Related Entities"]
          for (let entry of this.nodeElements) {
              if (present.indexOf(entry.label) < 0){
                this.nodeSelected.push(entry)
              }
              
          }

          if (this.showGraph == 0){
              this.showGraph = -1;
          }
        },
        (err) => (this.error = err)
        )    
    }



    getManagment(BVDID){
      console.log("getManagment")
      console.log(BVDID)
    }

    getAll(BVDID){
      console.log("getAll")
      console.log(BVDID)
    }

    addNode(BVDIDs){
      for (let bvdid of BVDIDs){
          console.log(bvdid)
          this.getShareholdersSingle(bvdid)
      }
    }

    getNetwork(BVDID){
       console.log(BVDID)
       this.router.navigate(['/network', BVDID]);
    }

}
