import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REGISTER_URL = "http://wdev.be/saker/be/api/register";
  private LOGIN_URL = "http://wdev.be/saker/be/api/login_check";
  private CHECK_JWT = "http://wdev.be/saker/be/apiCheck";
  private UPDATE_URL = 'http://wdev.be/saker/be/api/updateuser';
  public redirectUrl: string;
  constructor(private http: HttpClient, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }

  registerUser(user) {
    return this.http.post<any>(this.REGISTER_URL, user);
  }

  loginUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.LOGIN_URL, user, httpOptions);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser(theme: string) {
    // console.log(theme);
    this.setTheme(theme);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  setTheme(theme: string) {
    let themeJson = {
      'theme': theme
    }
    return this.http.put('http://wdev.be/saker/be/api/setTheme', themeJson, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateUser(formValue) {
    console.log(formValue);
    return this.http.put(this.UPDATE_URL, formValue, { headers: { 'Content-Type': 'application/json' } });
  }

  checkToken() {
    this.http.get(this.CHECK_JWT).subscribe(
      (resultaat) => {
      // console.log(resultaat);
      console.log(JSON.stringify(resultaat));
    },
    (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['/auth/login']);
          this.ngFlashMessageService.showFlashMessage({
            messages: [err.error.message],
            dismissible: true,
            timeout: 10000,
            type: 'danger'
          });
          if (err.error.message === 'Expired JWT Token' || err.error.message === 'Invalid JWT Token'){
            localStorage.removeItem('token');
          }
        }
      }
    }
    );
  }

  getUseremail() {
    return this.http.get(this.CHECK_JWT);
  }
}
