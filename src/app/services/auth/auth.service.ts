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
      .post(environment.node + "/login", doctor, { headers: headers })
      .map(res => res.json());
  }

  validate(username, password) {
    if (username === undefined || password === undefined) return false;
    return true;
  }

  validateDoctor(rut, icm, password) {
    if (rut === undefined || icm === undefined || password === undefined)
      return false;
    return true;
  }

  logout() {
    this.user = null;
    localStorage.clear();
  }

  isAdmin() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.role === undefined) return false;
    if(this.user.role.name === "Administrador") return true;
    return false;    
  }

  isCompany() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.role === undefined) return false;
    if(this.user.role.name === "Empresa") return true;
    return false;    
  }

  isDoctor() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.icm === undefined) return false;
    return true;    
  }

  isEmployee() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.role === undefined) return false;
    if(this.user.role.name === "Trabajador") return true;
    return false;    
  }

  isEngineer() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.role === undefined) return false;
    if(this.user.role.name === "Ingeniero") return true;
    return false;    
  }

  isSupervisor() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.role === undefined) return false;
    if(this.user.role.name === "Supervisor") return true;
    return false;    
  }

  isTechnical() {
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(this.user.role === undefined) return false;
    if(this.user.role.name === "Tecnico") return true;
    return false;    
  }


}
