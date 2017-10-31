import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { environment } from "./../../../../environments/environment";
import { AuthService } from "./../../../services/auth/auth.service";

@Component({
  selector: "app-medical-visit",
  templateUrl: "./medical-visit.component.html",
  styleUrls: ["./medical-visit.component.css"]
})
export class MedicalVisitComponent implements OnInit {
  doctor: any;
  evaluations: any;
  exists: boolean;
  constructor(
    private http: HttpClient,
    private route: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem("user"));
    this.exists = false;
    this.getVisits();
  }

  getVisits() {
    this.http
      .get(environment.url + `/attentions/${this.doctor.icm}`)
      .subscribe(data => {
        this.evaluations = data["data"];
        let id = 1;
        this.evaluations = _.map(this.evaluations, evaluation => {
          evaluation.id = id;
          id = id + 1;
          return evaluation;
        });
        if (this.evaluations !== null) this.exists = true;
        console.log(this.evaluations);
      });
  }
}
