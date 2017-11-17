import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DoctorGuard } from "./../../guards/roles/doctor.guard";
import { AuthService } from "./../../services/auth/auth.service";
import { environment } from "./../../../environments/environment";
import * as pdf from "jspdf";
import * as momemt from "moment/moment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: any;
  trainings: any;
  evaluations: any;
  employees: any;
  constructor(
    private router: Router,
    private doctor: DoctorGuard,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.auth.isCompany()) this.getKPI();
      this.employees = JSON.parse(localStorage.getItem("employees"));
      this.evaluations = JSON.parse(localStorage.getItem("evaluations"));
      this.trainings = JSON.parse(localStorage.getItem("trainings"));
      console.log(
        "empl " +
          this.employees +
          ", eva " +
          this.evaluations.terreno +
          ", trai " +
          this.trainings
      );
    }
  }

  getKPI() {
    this.http
      .get(`${environment.url}/kpi/${this.user.customer.id}`)
      .subscribe(data => {
        console.log(data);
        localStorage.setItem("employees", JSON.stringify(data["employees"]));
        localStorage.setItem(
          "evaluations",
          JSON.stringify(data["evaluations"])
        );
        localStorage.setItem("trainings", JSON.stringify(data["trainings"]));
      });
  }

  toPDF() {
    const doc = new pdf();
    doc.setFontSize(30);
    doc.text(
      `Informe de ${this.user.customer.name}`,
      60,
      13
    );
    doc.setFontSize(15);
    doc.text(
      `La empresa ${this.user.customer.name} posee ${this
        .employees} empleados registrados en el sistema de Safe S.A.`,
      20,
      30
    );
    doc.text(
      `Se han realizado ${this.evaluations.terreno +
        this.evaluations.personal} evaluaciones, de las cuales ${this
        .evaluations.terreno} son de infraestructura`,
      20,
      50
    );
    doc.text(`y ${this.evaluations.personal} son de personal.`, 20, 60);
    doc.text(
      `La empresa ${this.user.customer.name}, tiene registrada las siguientes capacitaciones.`,
      20,
      80
    );
    let aux = 90;
    this.trainings.forEach(element => {
      doc.text(
        `•${element.name}, realizada el día ${element.date}.`,
        30,
        aux
      );
      aux = aux + 10;
    });
    doc.save(`${this.user.customer.name}.pdf`);
  }
}
