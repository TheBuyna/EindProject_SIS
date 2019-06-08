import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    return this.http.get('http://localhost:8000/api/getWeather/' + location);
  }

  /// Helper to make weather icons work
  /// better solution is to map icons to an object
  weatherIcon(icon) {
    switch (icon) {
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'clear-night':
        return 'wi wi-night-clear';
      case 'rain':
        return 'wi wi-rain';
      case 'snow':
        return 'wi wi-snow';
      case 'sleet':
        return 'wi wi-sleet';
      case 'wind':
        return 'wi wi-strong-wind';
      case 'fog':
        return 'wi wi-fog';
      case 'cloudy':
        return 'wi wi-cloudy';
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'partly-cloudy-night':
        return 'wi wi-night-alt-cloudy';
      default:
        return `wi-na`;
    }
  }
}
