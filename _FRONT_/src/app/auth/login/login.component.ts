import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }
  login(form) {
    console.log(form.value);
    this.auth.loginUser(form.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        if (this.auth.redirectUrl) {
          console.log(this.auth.redirectUrl);
          this.router.navigate([this.auth.redirectUrl]);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (err) => {
        this.ngFlashMessageService.showFlashMessage({
          messages: [err.error.message],
          dismissible: true,
          timeout: 5000,
          type: 'danger'
        });
      }
    );
    // console.log(httpOptions);
  }
}
