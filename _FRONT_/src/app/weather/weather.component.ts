import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.geocode('antwerpen');
  }
  latitude;
  longitude;
  location;
  geocode(address) {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGhlYnV5bmEiLCJhIjoiY2pzdWZuYmxiMXhhajRhb2VndTBkejd1YiJ9.-w5sSkmdFb6Fy796In5Afg'
    
    this.http.get(URL).subscribe(
      (res) => {
        this.latitude = res['features']['0']['center']['1'];
        this.longitude = res['features']['0']['center']['0'];
        this.location =res['features']['0']['place_name'];
        console.log(res['features']['0']['center']);
        this.forecast(this.latitude, this.longitude);
      },
      (err) => {
        console.log('error: ' + err);
      }
    );
 }

 forecast(latitude, longitude) {
  const URL = 'https://api.darksky.net/forecast/93efca3b6502e663700ecb988a4be0b0/' + latitude + ',' + longitude + '?units=si&lang=nl';
  this.http.get(URL).subscribe(
    (res) => {
      console.log(res['daily']['data']['0']['summary']);
    },
    (err) => {
      console.log(err['error']);
    }
  );
 }
}
