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
  doctor : any;
   
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem("user"));
    console.log(this.doctor)
  }

  getVisits(){
    this.http.get(environment.url + `/attentions/${this.doctor.icm}`).subscribe(data => {
      console.log(data)
    })
  }
}
