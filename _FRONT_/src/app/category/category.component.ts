import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  //@Input() searchRequest;

  constructor(private http: HttpClient, private router: Router, private ngFlashMessageService: NgFlashMessageService, private route: ActivatedRoute, private articleService: ArticleService, private authService: AuthService) { }

  SERVER_URL = "http://localhost:8000/apiCheck";

  category;
  allArticles;
  searchText;
  noPause = false;
  ngOnInit() {
    this.authService.checkToken();
    this.route.paramMap.subscribe(params => {
      this.category =  params.get('categoryName');
      this.searchText = params.get('searQuery');
      console.log(this.searchText);
      this.getArticles();
    });
  }

  // get articles depending on the category
  getArticles() {
    this.articleService.get_top_headlines('us', this.category,100).subscribe((result) => {
      this.allArticles = result['articles'];
  });
  }
}
