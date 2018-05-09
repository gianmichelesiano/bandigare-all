import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { MyDataService } from '../services/mydataservice';
import { Tipologia } from '../services/tipologia';
import { Categoria } from '../services/categoria';
import { Regione } from '../services/regioni';
import { Provincia } from '../services/provincia';
import {AppSettings} from '../appSettings';
import {MatSnackBar} from '@angular/material';



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

  



  constructor(private _mydataService: MyDataService, public snackBar: MatSnackBar) { 

    this.tipologie = this._mydataService.getTipologia();
    this.regioni = this._mydataService.getRegioni();




  	
  }


  onSelectTipologia(tipologiaid) {
    console.log(tipologiaid)
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
   }
   console.log('ricerca')
   console.log(tipologiaId)
   console.log(categoriaId)
   console.log(regioneId)
   console.log(provinciaId)
 }

}
