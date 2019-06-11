import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { all } from 'q';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) {}

  API_KEY = '8242b00c3eee4bf794d4bf1d138ee112';

  // Calls to articles handeling : get all, get searched articles, get headlines, get categories, history and read later articles

   get_article(searchQuery: string) {
      let replacedQuery = searchQuery.split(' ').join('-')
      let articles = 'https://newsapi.org/v2/everything?q=' + replacedQuery + '&sortBy=publishedAt&apiKey=' + this.API_KEY;
      return this.http.get(articles);
   }

   get_top_headlines(country: string, category: string = null, pageLimit: number = null){
     const headLineArticle = 'https://newsapi.org/v2/top-headlines?country=' + country + (!(category) ? '' : '&category=' + category) + (!(pageLimit) ? '' : '&pageSize=' + pageLimit) + '&apiKey=' + this.API_KEY;
     return this.http.get(headLineArticle);
   }

   get_article_category(category: string, country: string) {
    let articles = 'https://newsapi.org/v2/top-headlines?country=' + country + '&category=' + category + '&apiKey=' + this.API_KEY;
    return this.http.get(articles);
 }

 saveArticle(article: JSON) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const SAVE_ARTICLE_URL = 'http://localhost:8000/api/article/saveHistoryArticle';
    console.log(article);
    this.http.post(SAVE_ARTICLE_URL, article, httpOptions).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
 }

 saveReadLaterArticle(article: JSON) {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  const SAVE_ARTICLE_URL = 'http://localhost:8000/api/article/saveReadLaterArticle';
  console.log(article);
  this.http.post(SAVE_ARTICLE_URL, article, httpOptions).subscribe(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
  }
  getUserArticle(listName: string) {
    let listUrl;
    if (listName === 'history') {
      listUrl = 'getHistoryArticles';
    } else if (listName === 'readLater') {
      listUrl = 'getReadLaterArticles';
    }
    return this.http.get('http://localhost:8000/api/article/' + listUrl);
 }

 deleteHistoryArticle(id: any) {
  return this.http.get('http://localhost:8000/api/article/deleteHistoryArticle/' + id);
 }

 deleteReadLaterArticle(id: any) {
  return this.http.get('http://localhost:8000/api/article/deleteReadLaterArticle/' + id);
 }
}
