import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleListsComponent } from './article-lists/article-lists.component';
import { WeatherComponent } from './weather/weather.component';
import { ContactusComponent } from './contact-us/contact-us.component';
import { SearchComponent } from './search/search.component';


// routing paths
const routes: Routes = [
  {
    path: 'category/:categoryName',
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomepageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:  'auth', loadChildren:  './auth/auth.module#AuthModule'},
  { path: 'profile', component: ProfileComponent},
  { path: 'listArticles/:listName', component: ArticleListsComponent },
  { path: 'weather', component: WeatherComponent},
  { path: 'contact', component: ContactusComponent },
  { path: 'search/:searchQuery', component: SearchComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
