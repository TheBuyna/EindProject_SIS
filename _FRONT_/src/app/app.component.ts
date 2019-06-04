import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { ArticleService } from './services/article.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TNS | The News Spot';
  event: string = 'test app';
  
  darkTheme =  new FormControl(false);
  
  theme = "light";

  constructor(private themeService: ThemeService, private articleService: ArticleService) {}

  broadcastTop($e){
    console.log('event ontvangen');
   // this.fire = $e;
    console.log($e);
  }

}
