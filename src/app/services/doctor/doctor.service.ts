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
}
