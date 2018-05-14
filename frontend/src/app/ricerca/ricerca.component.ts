import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { MyDataService } from '../services/mydataservice';
import { Tipologia } from '../services/tipologia';
import { Categoria } from '../services/categoria';
import { Regione } from '../services/regioni';
import { Provincia } from '../services/provincia';
import {AppSettings} from '../appSettings';
import {MatSnackBar} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiService} from '../api.service';
import { environment } from '../../environments/environment';
  


interface ricercaModel {
  organization_country: string;
  provincia: string;

}

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  public apiAddress = environment.apiUrl;

  selectedTipologia:Tipologia = new Tipologia(0, '');
  selectedCategoria:Categoria = new Categoria('TT', 0, '');
  selectedRegione:Regione = new Regione(0, '');
  selectedProvincia:Provincia = new Provincia('TT', 0, '' );


  tipologie: Tipologia[];
  categorie: Categoria[];
  regioni: Regione[];
  provincie: Provincia[];

  countries = AppSettings.COUNTRY
  organization_country = ''
  selectedValue: string;

  public gare :any = [];

  



  constructor(private _mydataService: MyDataService, public snackBar: MatSnackBar, private http: HttpClient, private apiService:ApiService) { 

    this.tipologie = this._mydataService.getTipologia();
    //this.categoriaId = 'TT'
    this.regioni = this._mydataService.getRegioni();
  	
  }


  onSelectTipologia(tipologiaid) {
    console.log(tipologiaid)
    //this.tipologie = this._mydataService.getTipologia();
    this.categorie = this._mydataService.getCategoria().filter((item)=> item.tipologiaid == tipologiaid);
  }

  onSelectRegione(regioneid) {
    this.provincie = this._mydataService.getProvincia().filter((item)=> item.regioneid == regioneid);
  }

  ngOnInit() {
  }

 doRicerca(tipologiaId, categoriaId, regioneId, provinciaId){
   if (tipologiaId == 0){
         this.snackBar.open('Inserire almeno una tipologia', '', {duration: 3000,}); 
   } else {

       let regioneName = '';
       for(var key in this.regioni) {
         if (this.regioni[key]['id'] == regioneId){
           regioneName = this.regioni[key]['name']
         }
       }

       if (regioneId == 0){
                regioneName = 'tutte'
       }

       this.http.get(this.apiAddress + '/getGare/?tipologiaId='+tipologiaId+'&categoriaId='+categoriaId+'&regioneName='+regioneName+'&provinciaId='+provinciaId).subscribe((data) => {
           console.log("data")
           console.log(data)
           this.gare = data
       })
    }

 }

}
