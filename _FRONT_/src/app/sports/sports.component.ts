import { Component, OnInit } from '@angular/core';

import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {

  constructor(private articleService:ArticleService) { }
  allArticles: any;
  ngOnInit() {
    this.get_articles('sports', 'be');
  }

  get_articles(category: string, country: string) {
    this.articleService.get_article_category(category, country).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }
}
