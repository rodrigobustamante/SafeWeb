import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../../environments/environment";
import * as moment from "moment/moment";

@Injectable()
export class TrainingCreateService {
  training: any;
  constructor(private http: Http) {}
  create(training) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.url + "/trainings", training, { headers: headers })
      .map(res => res.json());
  }

  register(send) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.url + "/students", send, { headers: headers })
      .map(res => res.json());
  }

  assistance(send) {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    return this.http
      .put(environment.url + "/students", send, { headers: headers })
      .map(res => res.json());
  }

  validate(training) {
    if (training.name === undefined) return "Campo nombre requerido";
    if (training.expositor_id === undefined) return "Campo expositor requerido";
    if (training.training_type_id === undefined)
      return "Campo tipo de capacitación requerido";
    if (training.customer_id === undefined) return "Campo empresa requerido";
    if (training.date === undefined) return "Campo fecha requerido";
    if (training.observation === undefined)
      return "Campo observación requerido";
    if (training.date < moment().format("YYYY-MM-DD"))
      return "La fecha de capacitación no puede ser menor o igual al día de hoy";
    return true;
  }
}
