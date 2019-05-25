import { Component, OnInit } from '@angular/core';

import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  allArticles
  ngOnInit() {
    this.get_articles();
  }

  get_articles() {
    this.articleService.get_top_headlines('be', 'sports')
  }

}
