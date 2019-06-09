import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient, private weatherService: WeatherService, private spinner: NgxSpinnerService, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }
  currentWeather: [];
  hourlyWeather: [];
  dailyWeather: [];
  geocode: [];
  ngOnInit() {
    this.getCurrentWeather('antwerpen');
    /** spinner starts on init */
    this.spinner.show();
  }

  getCurrentWeather(location: string) {
    this.weatherService.getWeather(location).subscribe(
      (res) => {
        /** spinner starts on init */
        this.spinner.show();
        this.currentWeather = res['weather']['currently'];
        this.hourlyWeather = res['weather']['hourly'];
        this.dailyWeather = res['weather']['daily'];
        this.geocode = res['geocode'];
        this.spinner.hide();
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
            this.ngFlashMessageService.showFlashMessage({
              messages: [err.error.message],
              dismissible: true,
              timeout: 10000,
              type: 'danger'
            });
            if (err.error.message === 'Expired JWT Token' || err.error.message === 'Invalid JWT Token'){
              localStorage.removeItem('token');
            }
          }
        }
        this.spinner.hide();
      }
    );
  }

  checkMethod(){
    console.log('button works!!');
  }
}
