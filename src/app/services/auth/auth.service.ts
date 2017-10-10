import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  user: any;
  constructor(private http: Http) {
  }
  
  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.url + "/login", user, {headers: headers})
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
