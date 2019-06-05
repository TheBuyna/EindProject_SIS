import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';

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
  { path: 'history', component: HistoryComponent }
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
