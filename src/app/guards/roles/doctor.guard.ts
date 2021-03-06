import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DoctorGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem("user").toString());
    if (user.icm === undefined) return false;
    if (user.icm) return true;
    return false;
  }
}
