import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TopNewsComponent } from './top-news/top-news.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import { FooterComponent } from './footer/footer.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { HomeMainArticlesComponent } from './home-main-articles/home-main-articles.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { CommonModule } from '@angular/common';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticleService } from './services/article.service';
import { CategoryComponent } from './category/category.component';
import { ImagePreloadDirective } from './image-preload.directive';

import { NgFlashMessagesModule } from 'ng-flash-messages';
import { AuthGuard } from './auth.guard';
import { ThemeService } from './services/theme.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BeautifyKeyStringPipe } from './beautify-key-string.pipe';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ArticleListsComponent } from './article-lists/article-lists.component';
import { TruncateTextPipe } from './truncate-text.pipe';

import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { StringFilterPipe } from './string-filter.pipe';
import { WeatherComponent } from './weather/weather.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContactusComponent } from './contact-us/contact-us.component';
import { SearchComponent } from './search/search.component';
import { WorldComponent } from './world/world.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNewsComponent,
    RightSidebarComponent,
    NavbarComponent,
    FooterComponent,
    ScrollTopComponent,
    HomeMainArticlesComponent,
    LatestNewsComponent,
    CategoryComponent,
    ImagePreloadDirective,
    HomepageComponent,
    ProfileComponent,
    BeautifyKeyStringPipe,
    ArticleListsComponent,
    TruncateTextPipe,
    StringFilterPipe,
    WeatherComponent,
    ContactusComponent,
    SearchComponent,
    WorldComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgFlashMessagesModule.forRoot(),
    NgbModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    CarouselModule.forRoot(),
  ],
  exports: [    // optional in your case
    NgxSpinnerModule
  ],
  providers: [
    ArticleService, AuthGuard, ThemeService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
 // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
