import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isEmailError: boolean;
  isPasswordError: boolean;
  renderedError: string;
  passwordError: string;
  emailError: string;

  constructor(private auth: AuthService, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.isEmailError = false;
    this.isPasswordError = false;
  }

  register(form) {
    console.log(form.value);
    this.auth.registerUser(form.value).subscribe(
      (res) => {
        this.router.navigate(['/auth/login']);
        this.ngFlashMessageService.showFlashMessage({
          messages: [res.success + ' Please Login!'],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });

      },
      (err) => {
        // console.log(err.error.error);
        if (err.error.error.includes('Duplicate entry')) {
          this.isEmailError = true;
          this.emailError = 'Sorry, but user with this email has already been registered!';
          this.isPasswordError = false;
          this.ngFlashMessageService.showFlashMessage({
            messages: ['Sorry, but user with this email has already been registered!'],
            dismissible: true,
            timeout: 5000,
            type: 'danger'
          });
        } else if (err.error.error.includes('Invalid email address')) {
          this.isEmailError = true;
          this.emailError = err.error.error;
          this.isPasswordError = false;
        } else {
          if (err.error.error.includes('Password')) {
            this.isPasswordError = true;
            this.passwordError = err.error.error;
          }
          this.ngFlashMessageService.showFlashMessage({
            messages: [err.error.error],
            dismissible: true,
            timeout: 5000,
            type: 'danger'
          });
        }
      }
    );
  }
}
