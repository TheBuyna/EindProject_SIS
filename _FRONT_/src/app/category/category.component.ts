import { Component, OnInit } from '@angular/core';

import { ArticleService } from "../services/article.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  allArticles
  ngOnInit() {
    this.get_articles();
  }

  get_articles() {
    this.articleService.get_top_headlines('be', 'business')
  }
}
