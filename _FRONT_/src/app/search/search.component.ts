import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private ngFlashMessageService: NgFlashMessageService, private route: ActivatedRoute, private articleService: ArticleService, private authService: AuthService, private spinner: NgxSpinnerService) { }


  allArticles;
  totalResult;
  searchText;
  p: number = 1;
  ngOnInit() {
    this.authService.checkToken();
    this.route.paramMap.subscribe(params => {
      this.searchText = params.get('searchQuery');
      console.log('hier is : ' + this.searchText);
      this.getArticles(1);
    });
  }

  getArticles(page: number) {
    this.articleService.get_article(this.searchText, 10, page).subscribe((result) => {
      this.spinner.show();
      this.allArticles = result['articles'];
      this.totalResult = result['totalResults'];
      this.p = page;
      this.spinner.hide();
    },
    (err) => {
      this.spinner.hide();
      this.ngFlashMessageService.showFlashMessage({
        messages: [err.error.message],
        dismissible: true,
        timeout: 20000,
        type: 'danger'
      });
    });
  }

  scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
  }
}
