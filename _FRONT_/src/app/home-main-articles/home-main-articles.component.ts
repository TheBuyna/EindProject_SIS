import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home-main-articles',
  templateUrl: './home-main-articles.component.html',
  styleUrls: ['./home-main-articles.component.scss']
})
export class HomeMainArticlesComponent implements OnInit {

  constructor(private articleService: ArticleService) { }
  allArticles: any;
  ngOnInit() {
    this.get_articles('belgium');
  }

  get_articles(search: string) {
    this.articleService.get_article(search).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }
}
