import {Component} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Http } from '@angular/http';

export interface Element {
  date: number;
  user: string;
  type: string;
  search: string;
  json: string;
}


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent {
  displayedColumns = ['date', 'user', 'type', 'search', 'json'];
  items: Observable<any[]>;
  json:any
  constructor(db: AngularFireDatabase, private router: Router) {
     //this.items = db.list('monitor').valueChanges()
     this.items = db.list('monitor').valueChanges().map( (arr) => { return arr.reverse(); } );
  }


  callJson(json){

    this.json = json

  }
  
}

