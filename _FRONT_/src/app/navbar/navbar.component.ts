import { Component, OnInit, HostListener, Inject, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { element } from '@angular/core/src/render3';
import { FormControl, FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public toggle : boolean = true;
  public visible : boolean = true;

  avatar_url;
  theme = 'light';
  tsearch: any;
  searchedArticles;
  currentWeather: [];

  currentModeDark: boolean;

  darkTheme = new FormControl(false);

  toggleEvent(event){
    this.toggle = !this.toggle;
  }
  
  // toggle search label 
  searchDisplay(event){
    this.visible = !this.visible;
  }

  constructor(private themeService: ThemeService, private articleService:ArticleService, public authService: AuthService, private router:Router, private weatherService: WeatherService) {
    this.darkTheme.valueChanges.subscribe(value => {
      if (!value) {
        this.theme = 'light';
        this.themeService.toggleLight();
      } else {
        this.theme = 'dark';
        this.themeService.toggleDark();
      }
    });
  }
  
  ngOnInit() {
    this.getCurrentWeather('antwerpen');
    this.getAvatarUrl();
    this.setTheme(this.theme);
  }
  

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.toggle = true;
    this.visible = true;
  }

  setTheme(theme: string) {
    if (theme === 'light') {
      this.darkTheme.setValue(false);
    } else if (theme === 'dark') {
      this.darkTheme.setValue(true);
    }
  }
  getAvatarUrl() {
    this.authService.getUseremail().subscribe(
      (res) => {
        this.avatar_url = res['user']['email'];
        this.theme = res['user']['theme'];
        this.setTheme(this.theme);
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  searchFunc() {
    console.log(this.tsearch);
    this.router.navigate(['/search', this.tsearch ]);
  }

  getCurrentWeather(location: string) {
    this.weatherService.getWeather(location).subscribe(
      (res) => {
        // console.log(res['weather']['currently']);
        this.currentWeather = res['weather']['currently'];
      },
      (err) => {
        console.log(err['error']);
      }
    );
  }
}
