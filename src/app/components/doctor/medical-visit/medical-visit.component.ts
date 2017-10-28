import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { environment } from "./../../../../environments/environment";

@Component({
  selector: "app-medical-visit",
  templateUrl: "./medical-visit.component.html",
  styleUrls: ["./medical-visit.component.css"]
})
export class MedicalVisitComponent implements OnInit {
  doctor: any;
  evaluations: any;
  exists: boolean;
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem("user"));
    this.getVisits();
    if (this.evaluations === undefined) this.exists = false;
  }

  getVisits() {
    this.http
      .get(environment.url + `/attentions/${this.doctor.icm}`)
      .subscribe(data => {
        this.evaluations = data;
      });
  }
}
