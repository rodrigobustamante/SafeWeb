import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CheckRoleGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem("user").toString());
    if (user.role === undefined) user.role.name === "Doctor";
    const allowedRoles = route.data["allowedRoles"];
    let rol = user.role.name;
    return allowedRoles.some(x => x === rol);
  }
}
