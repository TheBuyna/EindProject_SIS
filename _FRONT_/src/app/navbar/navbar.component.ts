import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { element } from '@angular/core/src/render3';
import { FormControl, FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public toggle : boolean = true;
  public visible : boolean = true;
  
  toggleEvent(event){
    this.toggle = !this.toggle;
  }
  
  searchDisplay(event){
    this.visible = !this.visible;
  }

  darkTheme = new FormControl(false);
  
  constructor(private themeService: ThemeService, private articleService:ArticleService, private authService: AuthService) {
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
    this.toggle = true;
    this.visible = true;
  }
  tsearch: any;
  searchedArticles;

  searchFunc(){
    if (this.tsearch) {
      this.articleService.get_article(this.tsearch).subscribe((result) => {
        this.searchedArticles = result['articles'];
        this.visible = true;
        console.log(this.searchedArticles);

        this.tsearch = '';
      });
    }
  }
}
