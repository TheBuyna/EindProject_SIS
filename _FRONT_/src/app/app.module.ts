import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNewsComponent } from './top-news/top-news.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import { FooterComponent } from './footer/footer.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNewsComponent,
    RightSidebarComponent,
    NavbarComponent,
    FooterComponent,
    ScrollTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
