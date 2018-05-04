import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  bvdid:string
  constructor(private route: ActivatedRoute) { 

  	this.bvdid = this.route.snapshot.params['bvdid'];
  	console.log('network')
  	console.log(this.bvdid)

  }

  ngOnInit() {
  }

}
