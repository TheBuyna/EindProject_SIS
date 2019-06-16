import { Component, OnInit, Input} from '@angular/core';
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
  
  ngOnInit() {
    this.get_articles('us');
  }


  get_articles(country: string) {
    this.articleService.get_top_headlines(country,null,20,1).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }

  // save user read history
  saveHistoryArticle(article) {
    this.articleService.saveArticle(article);
  }

  // user saved articles
  saveReadLaterArticle(article) {
    this.articleService.saveReadLaterArticle(article);
  }
}
