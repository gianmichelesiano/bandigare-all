import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-json-page',
  templateUrl: './json-page.component.html',
  styleUrls: ['./json-page.component.css']
})
export class JsonPageComponent implements OnInit {
  
 

  @Input() json: any;

  constructor() { }

  ngOnInit() {
  }

}
