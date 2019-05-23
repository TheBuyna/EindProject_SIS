import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) {}

  API_KEY = '8242b00c3eee4bf794d4bf1d138ee112';

   get_article(searchQuery: string) {
      let replacedQuery = searchQuery.split(' ').join('-')
      let articles = 'https://newsapi.org/v2/everything?q=' + replacedQuery + '&sortBy=publishedAt&apiKey=' + this.API_KEY;
      return this.http.get(articles);
   }

   get_top_headlines(country: string, category: string = null, pageLimit: number = null){
// tslint:disable-next-line: max-line-length
     const headLineArticle = 'https://newsapi.org/v2/top-headlines?country=' + country + (!(category) ? '' : '&category=' + category) + (!(pageLimit) ? '' : '&pageSize=' + pageLimit) + '&apiKey=' + this.API_KEY;
     return this.http.get(headLineArticle);
   }

   get_article_category(category: string, country: string) {
    let articles = 'https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=' + this.API_KEY;
    return this.http.get(articles);
 }

}
