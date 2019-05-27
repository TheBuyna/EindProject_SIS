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
    this.get_articles('business', 'fr');
  }

  get_articles(category: string, country: string) {
    this.articleService.get_article_category(category, country).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }
}
