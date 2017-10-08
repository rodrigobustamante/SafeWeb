import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
  user: any;
  url:  String;
  constructor(private http: Http) {
    this.url = "http://localhost:4567"
  }
  
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:4567/login", user, {headers: headers})
    .map(res => res.json(), console.log(user));
  }
  storeUser(user){
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user
    location.reload()
  }

  

  logout(){
    this.user = null;
    localStorage.clear();
  }
}
