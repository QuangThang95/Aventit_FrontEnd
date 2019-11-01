import { AppConfigService } from './../../app-config.service';
import { Injectable } from '@angular/core';
import {
  CanLoad,
  CanActivate,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private appConfigService: AppConfigService, private router: Router) { }

  canLoad(route: Route): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate([this.appConfigService.getConfig().page.login]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // check authentication
    return this.isLoggedIn(state.url);
  }

  isLoggedIn(url?: string): boolean {
    const currentUser = JSON.parse(localStorage.getItem('user:logined'));
    if (currentUser && currentUser.isLoggedIn) { return true; }
    this.router.navigate([this.appConfigService.getConfig().page.login]);
    return false;
  }
}
