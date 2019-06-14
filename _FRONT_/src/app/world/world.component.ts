import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {

  constructor( private route: ActivatedRoute, private articleService: ArticleService, private authService: AuthService) { }
  country;
  allArticles;
  searchText;
  noPause = false;
  ngOnInit() {
    this.authService.checkToken();
    this.route.paramMap.subscribe(params => {
      this.country =  params.get('countryCode');
      this.getArticles();
    });
  }
  // get articles depending on the category
  getArticles() {
    this.articleService.get_top_headlines(this.country, null, 100).subscribe((result) => {
      this.allArticles = result['articles'];
  });
  }
}
