import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'news-site';

  darkTheme =  new FormControl(false);
  
  theme = "light";

  constructor(private themeService: ThemeService) {}
  
}
