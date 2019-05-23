import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { element } from '@angular/core/src/render3';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public toggle : boolean = true;
  
  toggleEvent(event){
    this.toggle = !this.toggle;
  }
  
  darkTheme = new FormControl(false);

  constructor(private themeService: ThemeService) {
    this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });
  }

  ngOnInit() { 
    this.themeService.toggleLight();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.toggle=true;
  }
}
