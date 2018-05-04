import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

interface marker {
  lat: number;
  lng: number;
  label?: string;
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})



export class GoogleMapComponent implements OnInit {

    address:string=''
    lat: number;
    lng: number;
    markers: marker[] = []

    constructor(private http:Http) { }

    ngOnInit() {
      this.getUserLocation()
    }

    findGeo(address){
      console.log(address)
      console.log(this.getLocation(address))
    }

    getLocation(address: string) {
       console.log('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyDlrPvrjndKPbJxqLhzcVtLYDXHG6fvaNQ')
       return this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false&key=AIzaSyDlrPvrjndKPbJxqLhzcVtLYDXHG6fvaNQ')
               .subscribe( data => {
                 let tmpLat = JSON.parse(data['_body'])["results"][0]['geometry']["location"]['lat']
                 let tmpLng = JSON.parse(data['_body'])["results"][0]['geometry']["location"]['lng']
                 console.log(tmpLat, tmpLng)
                 let ele = { lat:tmpLat, lng:tmpLng, label:'C'}
                 this.markers.push(ele)
                 // add marker
               });
    }
    
    private getUserLocation() {
     /// locate the user
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;

       });
     }
   }
 }