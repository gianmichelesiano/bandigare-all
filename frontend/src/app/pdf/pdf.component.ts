import { Component, OnInit, Inject } from '@angular/core';
import * as jsPDF from 'jspdf'
import { Http } from '@angular/http';
import {Subscription} from 'rxjs';
import 'rxjs/Rx' ;



@Component({
selector:'app-pdf',
templateUrl:'./pdf.component.html',
styleUrls: ['./pdf.component.css'],
providers: [
{ provide: 'Window', useValue: window }
]
})
export class PdfComponent implements OnInit {

	companyName: string;
	urlPdfDownload: string;
	constructor(@Inject('Window') private window: Window, private http:Http) {
	   this.companyName = ''; 
	   this.urlPdfDownload = ''; 
	}

	ngOnInit() {}

	download(companyName) {
		this.urlPdfDownload = 'http://127.0.0.1:5000/dms/pdf/v1.0/reportlab?param='+companyName
		return this.urlPdfDownload
	}
}
