import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Sorry, You have to login first!'],
        dismissible: true,
        timeout: 5000,
        type: 'danger'
      });
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
