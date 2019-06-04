import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {

  constructor(private articleService: ArticleService, private authService: AuthService) { }

  allArticles: any;
  ngOnInit() {
    this.get_articles();
  }

  get_articles() {
    this.articleService.get_top_headlines('be').subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }

  saveReadLaterArticle(article) {
    this.articleService.saveArticle(article);
  }
}
