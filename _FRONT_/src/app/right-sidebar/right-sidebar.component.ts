import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  allArticles;
  ngOnInit() {
    this.get_articles('sports', 'fr');
  }

  get_articles(category: string, country: string) {
    this.articleService.get_article_category(category, country).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }

}
