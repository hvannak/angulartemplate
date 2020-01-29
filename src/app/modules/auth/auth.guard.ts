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
      if (localStorage.getItem('token') != null){
        if(state.url == '/login') {
          this.router.navigate(['/']);
          return false;
        }
        return this.validateMenuExisting(state.url);
      }
      else {
          if(state.url == '/login'){
            return true;
          }
          else {
            this.router.navigate(['/companyinfo']);
            return false;
          }
        }
    }

    validateMenuExisting(url:string):boolean{
      let strmenu = localStorage.getItem('menus');
        let menuApplist: any[];
        menuApplist = JSON.parse(strmenu);
        let value = url.split('/');
        let found = -1;
        let status:boolean = true;
        if(value[1] != ""){
          menuApplist.forEach(element => {
            let index = element.applicationMenus.findIndex(x=>x.RouterLink.includes(value[1]));
            if(found == -1){
              if(index >= 0) {
                found = index;
                status = true;
              }
              else {
                status = false;
              }
            }
          });
        }
        return status;
    }
  
}
