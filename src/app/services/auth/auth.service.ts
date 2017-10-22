import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {
  user: any;
  constructor(private http: Http) {}

  loginUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.url + "/login", user, { headers: headers })
      .map(res => res.json());
  }

  storeUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
    location.reload();
  }

  loginDoctor(doctor) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.node + "", doctor, { headers: headers })
      .map(res => res.json());
  }

  validate(username, password) {
    if (username === undefined || password === undefined) return false;
    return true;
  }

  logout() {
    this.user = null;
    localStorage.clear();
  }
}
