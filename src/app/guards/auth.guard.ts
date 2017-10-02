import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}  
  canActivate(){
    if(localStorage.getItem('user') !== null){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
  }
}
