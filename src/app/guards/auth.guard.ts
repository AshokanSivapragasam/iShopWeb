import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    if (localStorage.getItem('user-identity')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
