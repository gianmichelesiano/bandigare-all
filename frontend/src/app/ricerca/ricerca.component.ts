import { Component, OnInit } from '@angular/core';


import { MyDataService } from '../services/mydataservice';
import { Tipologia } from '../services/tipologia';
import { Categoria } from '../services/categoria';
import { Regione } from '../services/regioni';
import { Provincia } from '../services/provincia';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  categoria:string = '';
  regione:string = '';
  provincia:string = '';

  selectedTipologia:Tipologia = new Tipologia(0, ''); 
  selectedCategoria:Categoria = new Categoria('TT', 0, '');
  selectedRegione:Regione = new Regione(0, '');
  selectedProvincia:Provincia = new Provincia('TT', 0, '' );  

  numGareInfinite : number = 10;
  visible : boolean = false;
  
  tipologie: Tipologia[];
  categorie: Categoria[];
  provincie: Provincia[];
  regioni: Regione[];

  public gare = [];
  public gareFiltrate = [];
  public gareRicercate = [];
  public gareOrdinate = [];
  public gareFiltrateCategorie = [];

  constructor(private _mydataService: MyDataService) { 

  	this.tipologie = this._mydataService.getTipologia();
  	this.regioni = this._mydataService.getRegioni();
    let val = localStorage.getItem('gareDB')

    console.log('ricerca cap')
    console.log(val)


  	
  }

  ngOnInit() {
  }

}
