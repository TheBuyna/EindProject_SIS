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

  constructor(private auth: AuthService, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }

  register(form) {
    console.log(form.value);  
    this.auth.registerUser(form.value).subscribe(
      (res) => {
        this.router.navigate(['/auth/login']);
        this.ngFlashMessageService.showFlashMessage({
          messages: [res.success + " Please Login!"],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });

      },
      (err) => console.log(err)
    );
  }
}
