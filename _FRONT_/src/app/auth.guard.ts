import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private ngFlashMessageService: NgFlashMessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.authService.redirectUrl = url;
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
