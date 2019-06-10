import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private ngFlashMessageService: NgFlashMessageService, private route: ActivatedRoute, private articleService: ArticleService, private authService: AuthService) { }

  SERVER_URL = "http://localhost:8000/apiCheck";

  category;
  allArticles;
  ngOnInit() {
    this.authService.checkToken();
    this.route.paramMap.subscribe(params => {
      this.category =  params.get('categoryName');
      this.getArticles();
    });
  }

  getArticles() {
    this.articleService.get_top_headlines('us', this.category,100).subscribe((result) => {
      this.allArticles = result['articles'];
  });
  }

}
