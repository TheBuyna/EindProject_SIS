import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private modalService: NgbModal
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

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
