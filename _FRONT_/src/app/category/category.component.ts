import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private ngFlashMessageService: NgFlashMessageService, private route: ActivatedRoute, private articleService: ArticleService) { }

  SERVER_URL = "http://localhost:8000/apiCheck";

  category;
  allArticles;
  ngOnInit() {
    this.getRequest();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('categoryName'));
      this.category =  params.get('categoryName');
    });
    this.getArticles();
  }
  getRequest() {
    this.http.get(this.SERVER_URL).subscribe(
      (resultaat) => {
      console.log(JSON.stringify(resultaat));
    },
    (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/auth/login']);
          this.ngFlashMessageService.showFlashMessage({
            messages: [err.error.message],
            dismissible: true,
            timeout: 10000,
            type: 'danger'
          });
          if (err.error.message === 'Expired JWT Token' || err.error.message === 'Invalid JWT Token'){
            localStorage.removeItem('token');
          }
        }
      }
    }
    );
  }

  getArticles() {
    this.articleService.get_top_headlines('us', this.category).subscribe((result) => {
      this.allArticles = result['articles'];
  });
  }
}
