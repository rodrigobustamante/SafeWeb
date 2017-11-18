import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import * as _ from "lodash";
import { DoctorService } from "./../../../services/doctor/doctor.service";

@Component({
  selector: "app-register-medical-visit",
  templateUrl: "./register-medical-visit.component.html",
  styleUrls: ["./register-medical-visit.component.css"]
})
export class RegisterMedicalVisitComponent implements OnInit {
  date: any;
  icm: any;
  employee_id: any;
  customers: any;
  doctors: any;
  employees: any;
  customer_id: any;
  public loading = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private service: DoctorService,
    private message: FlashMessagesService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadDoctors();
  }

  loadDoctors() {
    this.http.get(environment.node).subscribe(data => {
      this.doctors = data["data"];
      this.doctors = _.map(this.doctors, doctor => {
        if (doctor.condition === "Afiliado") {
          return doctor;
        }
      });
      this.doctors = _.filter(this.doctors, null);
      console.log(this.doctors);
    });
  }

  loadEmployees(id) {
    this.http.get(environment.url + "/employees").subscribe(data => {
      this.employees = data["data"];
      this.employees = _.map(this.employees, employee => {
        if (employee.customer.id === Number(id)) {
          return employee;
        }
      });
      this.employees = _.filter(this.employees, null);
      console.log(this.employees);
    });
  }

  onFilter() {
    this.loadEmployees(this.customer_id);
  }

  loadCustomers() {
    this.http.get(environment.url + "/customers").subscribe(data => {
      this.customers = data["data"];
    });
  }

  onRegister() {
    let attention = {
      icm: this.icm,
      attention_date: this.date,
      employee_id: this.employee_id
    };
    let validate = this.service.validateRegisterMedicalVisit(attention);
    if (validate != true) {
      this.loading = false;
      this.message.show(`¡${validate}!`, {
        cssClass: "alert-danger",
        timeout: 7000
      });
    } else {
      this.service.createAttention(attention).subscribe(
        data => {
          this.router
            .navigate(["doctors/medical-visit-list"])
            .then(() => {
              this.message.show(`¡Visita médica registrada correctamente!`, {
                cssClass: "alert-success",
                timeout: 5000
              });
            })
            .catch(err => {
              this.message.show(`¡Error al ingresar la visita médica!`, {
                cssClass: "alert-danger",
                timeout: 5000
              });
            });
        },
        err => {
          this.message.show(`¡Error al ingresar la visita médica!`, {
            cssClass: "alert-success",
            timeout: 5000
          });
        }
      );
    }
  }
}
