import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../mobx/auth-state';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authState: AuthState, private router: Router, private notifications: NotificationsService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authState.isAdmin) {
        this.notifications.error("You are not authorized!");
        this.router.navigateByUrl("/home");
        return false;
      }
    return true;
  }
  
}
