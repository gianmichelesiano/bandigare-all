import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppSettings} from '../appSettings';
import {AuthAPI} from '../auth.api';


interface zefixSearch {
  company_name: string;
}

@Component({
  selector: 'app-zefix',
  templateUrl: './zefix.component.html',
  styleUrls: ['./zefix.component.css']
})
export class ZefixComponent implements OnInit {

  constructor(private http:Http, private route: ActivatedRoute, private router: Router, public aAPI: AuthAPI) { }
  retObj: any = null;
  retVal: any = null;
  retObjDetails : any = null;
  urlZefix : string = ''
  urlZefixDetails : string = ''
  result : string = ''
  busy: Subscription;
  model : zefixSearch = {
  					  company_name:'',
  					 };
  ngOnInit() {
  }

  findZefix(model){
    this.urlZefix = AppSettings.API_ENDPOINT+'dms/zefix/v1.0/SearchByName?company_name='+ model.company_name
    this.busy = this.http.get(this.urlZefix, this.aAPI.getHeaderOpts())
           .subscribe(data => {
           this.retVal = JSON.parse(data['_body'])
           this.result = this.retVal['result']
           this.retObj = this.retVal['data']
     }); 
  }
  detailsClick(chid){
  	console.log(chid)
    this.router.navigate(['/detailsZefix', chid]);
  }

}
