import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from "./category/category.component";
import { SportsComponent } from "./sports/sports.component";

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'sports', component: SportsComponent },
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
