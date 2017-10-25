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
  constructor(private router: Router, private http: HttpClient, private service: DoctorService) {}

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
    }
    this.service.createAttention(attention).subscribe(data => {
      console.log(data)
    })
    //console.log("date " + this.date + " empleado" + this.employee_id + " icm:" + this.icm);
  }
}
