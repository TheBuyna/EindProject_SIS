import { Component, OnInit, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-main-articles',
  templateUrl: './home-main-articles.component.html',
  styleUrls: ['./home-main-articles.component.scss']
})
export class HomeMainArticlesComponent implements OnInit {

  constructor(private articleService: ArticleService, private authService: AuthService) { }
  allArticles: any;
  //@Input('messages') mess: any;
  
  ngOnInit() {
    this.get_articles('us');
  }


  get_articles(country: string) {
    this.articleService.get_top_headlines(country,null,20,1).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }
  
  // toUp() {
  //   (function smoothscroll() {
  //       var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //       if (currentScroll > 0) {
  //           window.requestAnimationFrame(smoothscroll);
  //           window.scrollTo(0, currentScroll - (currentScroll / 8));
  //       }
  //   })();
  // }

  // save user read history
  saveHistoryArticle(article) {
    this.articleService.saveArticle(article);
  }

  // user saved articles
  saveReadLaterArticle(article) {
    this.articleService.saveReadLaterArticle(article);
  }
}
