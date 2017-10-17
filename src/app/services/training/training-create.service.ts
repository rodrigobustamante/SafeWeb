import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class TrainingCreateService {
  training: any;
  constructor(private http: Http) {}
  create(training){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.url + "/trainings", training, {headers: headers})
    .map(res => res.json());
  }

  register(send){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.url + "/students", send, {headers: headers})
    .map(res => res.json());
  }
}
