import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class EvaluationCreateService {
  evaluation: any;
  constructor(private http: Http) {
  }

  create(evaluation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.url + "/evaluations", evaluation, {headers: headers})
    .map(res => res.json());
  }
}
