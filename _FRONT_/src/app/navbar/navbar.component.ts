import { Component, OnInit, HostListener, Inject, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { element } from '@angular/core/src/render3';
import { FormControl, FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //@Output() sendevent: EventEmitter<any> = new EventEmitter();

  public toggle : boolean = true;
  public visible : boolean = true;

  avatar_url;
  theme = 'light';
  
  toggleEvent(event){
    this.toggle = !this.toggle;
  }
  
  searchDisplay(event){
    this.visible = !this.visible;
  }

  currentModeDark: boolean;

  darkTheme = new FormControl(false);
  
  constructor(private themeService: ThemeService, private articleService:ArticleService, private authService: AuthService, private router:Router) {
    this.darkTheme.valueChanges.subscribe(value => {
      if (!value) {
        this.theme = 'light';
        this.themeService.toggleTheme(this.theme);
      } else {
        this.theme = 'dark';
        this.themeService.toggleTheme(this.theme);
      }
    });
  }

  ngOnInit() {
    this.getAvatarUrl();
    this.themeService.toggleTheme(this.theme);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.toggle = true;
    this.visible = true;
  }
  
  tsearch: any;
  searchedArticles;
  
  getAvatarUrl() {
    this.authService.getUseremail().subscribe(
      (res) => {
        this.avatar_url = res['user']['email'];
        this.theme = res['user']['theme']
        this.themeService.toggleTheme(this.theme);
        console.log(res);
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  searchFunc(){
    // if (this.tsearch) {
    //   this.articleService.get_article(this.tsearch).subscribe((result) => {
    //     this.searchedArticles = result['articles'];
    //     this.visible = true;
    //     console.log(this.searchedArticles);

    //     this.tsearch = '';
    //   });
    // }

    //this.sendevent.emit(this.tsearch);
    console.log(this.tsearch);
    this.router.navigate(['/category/sports', {searchQuery: this.tsearch} ]);
  }
}
