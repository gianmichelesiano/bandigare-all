import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  infoTitle?: string;
  infoDesc?: string;
}


@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {

  address:string=''
  lat: number;
  lng: number;



  @Input() markers: marker[];
  constructor() { }

  ngOnInit() {
  }

}
