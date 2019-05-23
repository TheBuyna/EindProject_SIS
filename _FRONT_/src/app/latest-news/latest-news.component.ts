import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  allArticles;
  ngOnInit() {
    this.get_articles();
  }

  get_articles() {
    this.articleService.get_top_headlines('us', 'entertainment', 26).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }
}
