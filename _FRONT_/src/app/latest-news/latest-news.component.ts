import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  constructor(private articleService:ArticleService, private authService: AuthService) { }

  allArticles;
  ngOnInit() {
    this.get_articles();
  }

  // request for top headlines articles
  get_articles() {
    this.articleService.get_top_headlines('us', 'general', 40).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }

  saveHistoryArticle(article) {
    this.articleService.saveArticle(article);
  }

  saveReadLaterArticle(article) {
    this.articleService.saveReadLaterArticle(article);
  }
}
