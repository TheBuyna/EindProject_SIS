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
  login(form){
    /**
     * 'POST' methode met FormData
     */
    this.auth.loginUser(form.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res['token']);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.ngFlashMessageService.showFlashMessage({
          messages: [err.error.message],
          dismissible: true,
          timeout: false,
          type: 'danger'
        });
      }
    );
    // console.log(httpOptions);
  }
}
