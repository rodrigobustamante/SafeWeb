import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EvaluationCreateService {
  evaluation: any;
  url:  String;
  constructor(private http: Http) {
    this.url = "http://localhost:4567"
  }

  create(evaluation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://d33951a5.ngrok.io/evaluations", evaluation, {headers: headers})
    .map(res => res.json());
  }
}
