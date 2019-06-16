import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private articleService:ArticleService, public authService: AuthService, private router:Router) { }

  public toggleMenu : boolean = true;
  avatar_url;
  allArticles;
  
  toggleEvent(event){
    this.toggleMenu = !this.toggleMenu;
  }

  ngOnInit() {
    this.getAvatarUrl();
    this.get_articles();
  }

  // host listener for a scroll event
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.toggleMenu = true;
  }

  // scroll to top if a menu item is pressed
  scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
  }

  // get user avatar
  getAvatarUrl() {
    this.authService.getUseremail().subscribe(
      (res) => {
        this.avatar_url = res['user']['email'];
      },
      (err) => {
        console.log(err.error);
      }
    )
  }

  get_articles() {
    this.articleService.get_top_headlines('us', 'general', 26).subscribe((result) => {
        this.allArticles = result['articles'];
    });
  }
}
