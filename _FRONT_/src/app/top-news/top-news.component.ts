import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../article.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  allArticles:any;
  ngOnInit() {
    this.get_articles();
  }

  get_articles() {
    this.articleService.get_top_headlines('nl').subscribe((result) => {
        this.allArticles = result.articles;
         console.log(result);
    });
  }
}
