import { Injectable } from '@angular/core';

export const lightTheme = {
  'primary-color': '#EEEEEE',
  'background-color': '#FFFFFF',
  'text-color': '#000000',
  'footer-main': '#444444',
  'footer-bottom': '#333333',
  'scroll-handel': '#999'
};

export const darkTheme = {
  'primary-color': '#000000',
  'background-color': '#000000',
  'text-color': '#FFFFFF',
  'footer-main': '#000000',
  'footer-bottom': '#000000',
  'scroll-handel': '#333333'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  toggleTheme(theme: string){
    console.log(theme);
    if ( theme === 'dark') {
      this.toggleDark();
    } else if ( theme === 'light') {
      this.toggleLight();
    }
  }
  toggleDark() {
    this.setTheme(darkTheme);
    console.log('darkkkkk');
  }

  toggleLight() {
    this.setTheme(lightTheme);
    console.log('lighttttt');
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
