import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "../../../environments/environment";
import * as moment from "moment/moment";

@Injectable()
export class DoctorService {
  constructor(private http: Http) {}
  createAttention(attention) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.url + "/attentions", attention, { headers: headers })
      .map(res => res.json());
  }

  createExam(exam) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.url + "/exams", exam, { headers: headers })
      .map(res => res.json());
  }

  acceptVisit(id, data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put(environment.url + `/attentions/${id}/confirm`, data, {
        headers: headers
      })
      .map(res => res.json());
  }

  rejectVisit(id, data) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put(environment.url + `/attentions/${id}/reject`, data, {
        headers: headers
      })
      .map(res => res.json());
  }

  validateRegisterMedicalVisit(attention) {
    if (attention.icm === undefined) return "Campo icm vacío";
    if (attention.attention_date === undefined) return "Campo fecha vacío";
    if (attention.attention_date <= moment().format("YYYY-MM-DD"))
      return "La fecha no puede ser menor o igual al día actual";
    if (attention.employee_id === undefined) return "Campo empleado vacío";
    return true;
  }

  validateRegisterExam(exam) {
    if (exam.date === undefined) return "Campo fecha vacio";
    if (exam.date <= moment().format("YYYY-MM-DD"))
      return "La fecha no puede ser menor o igual al día actual";
    if (exam.type === undefined) return "Campo tipo vacio";
    if (exam.observation === undefined) return "Campo observación vacio";
    return true;
  }
}
