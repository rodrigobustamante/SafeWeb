import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';

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

  validate(evaluation){
    if(evaluation.evaluation_type_id === undefined) return "Campo tipo de evaluación vacío";
    if(evaluation.date === undefined) return "Campo fecha vacío";
    if(evaluation.date <= moment().format("YYYY-MM-DD")) return "La fecha no puede ser menor o igual al día actual"
    if(evaluation.customer_id === undefined) return "Campo empresa vacío";
    if(evaluation.observation === undefined) return "Campo observación vacío";
    return true;
  }
}
