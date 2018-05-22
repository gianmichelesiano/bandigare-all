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

  message = ''

  finished = false

  public gare :any = [];

  
  gareScroll = [];
  sum = 20;

  moduloVisibile = true

  panelOpenState: boolean = false;


  constructor(private _mydataService: MyDataService, public snackBar: MatSnackBar, private http: HttpClient, private apiService:ApiService) { 


    this.tipologie = this._mydataService.getTipologia();
    //this.categoriaId = 'TT'
    this.regioni = this._mydataService.getRegioni();

  	
  }

  Pulisci(){
    console.log('pul')

    this.selectedTipologia.id = 1
    this.selectedCategoria.id = 'TT'
    this.selectedRegione.id = 0
    this.selectedProvincia.id = 'TT'


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
    console.log('saasdasd')
  }

 doRicerca(tipologiaId, categoriaId, regioneId, provinciaId){

   this.moduloVisibile = false
   console.log(tipologiaId, categoriaId, regioneId, provinciaId)
   this.gare = []
   this.gareScroll = [];
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
             this.gare = data

             for (let i = 0; i < this.sum; ++i) {
               if (typeof(this.gare[i]) !== 'undefined'){
                
                
                console.log('-------')
                console.log(this.gare[i].fields.DOWNLOAD)
                console.log(this.getInfoDownload(this.gare[i].fields.DOWNLOAD))
                console.log(this.gare[i].fields.INFO_AGGIUNTIVE)
                console.log(this.getInfoAggiuntive(this.gare[i].fields.INFO_AGGIUNTIVE))

                let arrayDownload = this.getInfoDownload(this.gare[i].fields.DOWNLOAD)
                let arrayInfoAggintive = this.getInfoDownload(this.gare[i].fields.INFO_AGGIUNTIVE)
                let arrayRetDownload = arrayDownload.concat(arrayInfoAggintive);

                this.gare[i]['mylink'] = arrayRetDownload
                console.log(this.gare[i])
                this.gareScroll.push(this.gare[i]);

                console.log('********')
                
               }
             }
             console.log(this.gareScroll)
              if (this.gareScroll.length>0){
                  this.message = 'Sono state trovate '+this.gare.length+' gare. Scorri verso il basso per vedere tutte'
              } else {
                 this.message = 'Nessuna gara trovata'
              } 

       })
    }


    this.selectedTipologia.id = 1
    this.selectedCategoria.id = 'TT'
    this.selectedRegione.id = 0
    this.selectedProvincia.id = 'TT'

 }

 nuovaRicerca(){

   this.message = ''
   this.gareScroll = [];
   this.gare = [];
   this.moduloVisibile = true

 }

  onScrollDown () {
    console.log('scrolled!!');
    const start = this.sum;

    if (this.gare.length != this.gareScroll.length){
          if (this.gareScroll.length-this.gare.length){
        this.sum += 20;
          } else {
            this.sum = this.gare.length-this.gareScroll.length
          }

          // add another 20 items    
          for (let i = start; i < this.sum; ++i) {
            this.gareScroll.push(this.gare[i]);
          }

    }

  }

  apriDettaglio(gara){
    console.log(gara)
  }

  getInfoDownload(garaDownload){

    let arrayRetDownload = []
    let etichetta = 'Link'
    let tipo = 'link'
    if (garaDownload != ''){
      let i = 1
      let objectDownload = JSON.parse(garaDownload);

      for (var key in objectDownload) {
        if (key.toUpperCase().includes('AVVISO')){
          etichetta = "Avviso";
          tipo = 'download'
        } else if (key.toUpperCase().includes('DISCIP')){
              etichetta = "Disciplinare di gara";
              tipo = 'download'
        } else if (key.toUpperCase().includes('BANDO')){
           etichetta = "Bando di gara";
           tipo = 'download'
        } else if (key.toUpperCase().includes('RETTI')){
           etichetta = "Rettifica";
           tipo = 'download'
        } else if (key.toUpperCase().includes('SCHEMA')){
           etichetta = "Schema di gara";
           tipo = 'download'
        } else if (key.toUpperCase().includes('PLANIM')){
           etichetta = "Planimetria";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('COMPUT')){
           etichetta = "Computo Metrico";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('PDF')){
           etichetta = "Documento";
           tipo = 'download'
        }  else if (key.toUpperCase().includes('URL')){
           etichetta = "Apri sito web";
           tipo = 'link'
        }  else if (key.toUpperCase().includes('ANAC')){
           etichetta = "Pagina ANAC";
           tipo = 'link'
        } else if (key.toUpperCase().includes('FASCICOLO')){
           etichetta = "Fascicolo di gara";
           tipo = 'link'
        }  else {
          etichetta = "LINK " + i;
          tipo = 'link'
          i++
        }
        if (objectDownload[key] != '') {
          arrayRetDownload.push({chiave:etichetta, valore : objectDownload[key], tipo: tipo})
        }
      }
    }

    return arrayRetDownload

  }

  getInfoAggiuntive(garaInfoAggiuntive){

      let arrayRetInfoAggiuntive = []
      let etichetta = ''
      let tipo = ''

      if (garaInfoAggiuntive != '{}' && garaInfoAggiuntive != ''){
     
        
         let objectInfoAggiuntive = JSON.parse(garaInfoAggiuntive);
         for (var key in objectInfoAggiuntive) {
           if (key.toUpperCase().includes('MAIL')){
                 let mail = objectInfoAggiuntive[key]
                 console.log('mail')
           } else {
                if (key.toUpperCase().includes('LINK')){
                  etichetta = "Apri sito web";
                  tipo = 'link'
                } else if (key.toUpperCase().includes('SITO_GURI')){
                   etichetta = "Gazzetta Ufficiale";
                   tipo = 'link'
                } else if (key.toUpperCase().includes('SITO_WWW')){
                   etichetta = "Apri sito web";
                   tipo = 'link'
                }  else if (key.toUpperCase().includes('SITO_HTTP')){
                   etichetta = "Apri sito web";
                   tipo = 'link'
                }  else {
                  console.log('non ce risorsa aggiuntiva')
                }
                if (objectInfoAggiuntive[key] != '' && arrayRetInfoAggiuntive['valore'] != objectInfoAggiuntive[key]) {
                 arrayRetInfoAggiuntive.push({chiave:etichetta, valore : objectInfoAggiuntive[key], tipo: tipo})
                }
           }

         }
      }
      return arrayRetInfoAggiuntive
  }

}
