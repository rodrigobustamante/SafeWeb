import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  user: any;
  url:  String;
  constructor(private http: Http) {
    this.url = "http://e983647d.ngrok.io"
  }
  
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://e983647d.ngrok.io/login", user, {headers: headers})
    .map(res => res.json(), console.log(user));
  }
  storeUser(user){
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ')
    this.user = user
  }

  loggedIn() {
    return tokenNotExpired(); 
  }

  logout(){
    this.user = null;
    localStorage.clear();
  }
}
