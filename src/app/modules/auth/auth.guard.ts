import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){

  }
  
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        console.log(state.url);
      if (localStorage.getItem('token') != null){
        if(state.url == '/login') {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      else {
          if(state.url == '/login' || state.url == '/register'){
            return true;
          }
          else {
            this.router.navigate(['/companyinfo']);
            return false;
          }
        }
    }
  
}
