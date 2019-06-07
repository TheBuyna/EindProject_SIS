import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ThemeService } from '../services/theme.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, NgForm} from '@angular/forms';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  modalRef: BsModalRef;
  isDisabled = true;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private modalService: BsModalService,
    private fb: FormBuilder
    ) { }

    profileForm = this.fb.group({
      first_Name: [{value:'', disabled: this.isDisabled}],
      last_Name: [{value:'', disabled: this.isDisabled}],
      street_Name: [{value:'', disabled: this.isDisabled}],
      house_Number: [{value:'', disabled: this.isDisabled}],
      mailbox_Number: [{value:'', disabled: this.isDisabled}],
      city: [{value:'', disabled: this.isDisabled}],
      telephone: [{value:'', disabled: this.isDisabled}],
      postal_Code: [{value:'', disabled: this.isDisabled}],
      email: [{value:'', disabled: this.isDisabled}]
      
    });

    updateInfo() {
      this.profileForm.enable();
      console.log(this.profileForm);
    }

    // profileForm = new FormGroup({
    //   first_Name: new FormControl({value:'', disabled: true} , Validators.required),
    //   last_Name: new FormControl({value:'', disabled: true} , Validators.required),
    //   street_Name: new FormControl({value:'', disabled: true} , Validators.required),
    //   house_Number: new FormControl({value:'', disabled: true} , Validators.required),
    //   mailBox_Number: new FormControl({value:'', disabled: true} , Validators.required),
    //   city: new FormControl({value:'', disabled: true} , Validators.required),
    //   telephone: new FormControl({value:'', disabled: true} , Validators.required),
    //   postal_Code: new FormControl({value:'', disabled: true} , Validators.required),
    //   email: new FormControl({value:'', disabled: true} , Validators.required),
    // });

    onSubmit(myForm) {
      // console.log(this.profileForm);
      // this.profileForm.disable();

      this.auth.updateUser(myForm.value).subscribe(
        (res) => {
          this.ngFlashMessageService.showFlashMessage({
            messages: [res['success']],
            dismissible: true,
            timeout: 5000,
            type: 'success'
          });
  
        },
        (err) => {
          this.ngFlashMessageService.showFlashMessage({
            messages: ['An error occured while updating!!'],
            dismissible: true,
            timeout: 5000,
            type: 'danger'
          });
        }
      );
    }

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
      delete this.userInfo['theme']
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
    console.log(this.userInfo);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template
      );
  }

  resetPassword(form) {
    console.log(form.value);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post("http://127.0.0.1:8000/api/resetPassword", form.value, httpOptions).subscribe(
      (res) => {
        this.ngFlashMessageService.showFlashMessage({
        messages: [res['success']],
        dismissible: true,
        timeout: 5000,
        type: 'success'
      });
      },
      (err) => {
        this.ngFlashMessageService.showFlashMessage({
          messages: [err.error.error],
          dismissible: true,
          timeout: 5000,
          type: 'danger'
        });
      }
    );
  }

  
}
