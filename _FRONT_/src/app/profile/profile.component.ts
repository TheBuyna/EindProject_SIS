import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ThemeService } from '../services/theme.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private modalService: BsModalService
    ) { }

  private CHECK_JWT = "http://localhost:8000/apiCheck";
  userInfo = [];
  avatar_Url;
  userKeys = [];
  userValues= [];
  closeResult;
  ngOnInit() {
    this.http.get(this.CHECK_JWT).subscribe(
      (resultaat) => {
      this.userInfo = resultaat['user'];
      this.avatar_Url = this.userInfo['avatar_Url'];
      delete this.userInfo['avatar_Url'];
      this.sortResults(this.userInfo);
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

  sortResults(inputJson) {
    let keysInput = Object.keys(inputJson);
    let valuesInput = Object.values(inputJson);

    for (let key of keysInput){
      this.userKeys.push(key);
    }
    for (let value of valuesInput){
      this.userValues.push(value);
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template
      );
  }

  resetPassword(form) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post("http://127.0.0.1:8000/api/resetPassword", form.value, httpOptions).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.error.error)
        // this.ngFlashMessageService.showFlashMessage({
        //   messages: [err.error.message],
        //   dismissible: true,
        //   timeout: 5000,
        //   type: 'danger'
        // });
      }
    );
  }
}
