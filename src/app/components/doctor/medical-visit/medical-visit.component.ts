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
  doctor : any;
   
  constructor(private http: HttpClient, private route: Router, private auth: AuthService) {}

  ngOnInit() {
    this.doctor = JSON.parse(localStorage.getItem("user"));
    console.log(this.doctor)
    console.log("Admin " + this.auth.isAdmin())
    console.log("Empresa " + this.auth.isCompany())
    console.log("Doctor " + this.auth.isDoctor())
    console.log("Empleado " + this.auth.isEmployee())
    console.log("Ingeniero " + this.auth.isEngineer())
    console.log("Supervisor " + this.auth.isSupervisor())
    console.log("Técnico " + this.auth.isTechnical())
  }

  getVisits(){
    this.http.get(environment.url + `/attentions/${this.doctor.icm}`).subscribe(data => {
      console.log(data)
    })
  }
}
