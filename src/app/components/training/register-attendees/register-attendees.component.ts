import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';
import { FlashMessagesService } from "angular2-flash-messages";
import { TrainingCreateService } from '../../../services/training/training-create.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-register-attendees",
  templateUrl: "./register-attendees.component.html",
  styleUrls: ["./register-attendees.component.css"]
})
export class RegisterAttendeesComponent implements OnInit {
  customer_id: any = localStorage.getItem("customer_id");
  training_id: any = localStorage.getItem("training_id");
  customers: any;
  customer: any;
  employees: any;
  employee: any;
  loading = false;
  constructor(
    private http: HttpClient,
    private create: TrainingCreateService,
    private message: FlashMessagesService,
    private route: Router
  ) {}

  ngOnInit() {
    if(this.training_id === null && this.customer_id === null) this.route.navigate(["trainings"])
    this.http.get(environment.url + "/customers").subscribe(data => {
      this.customers = data["data"];
      this.customer = _.find(this.customers, c => {
        return c.id === Number(this.customer_id);
      });
    });
    this.getCustomers();
  }

  getCustomers() {
    this.http.get(environment.url + "/employees").subscribe(data => {
      this.employees = data["data"];
      this.employee = _.map(this.employees, employee => {
        employee.attending = false;
        if (employee.customer.id === Number(this.customer_id)) {
          return employee;
        }
      });
      this.employee = _.filter(this.employee, null);
    });
  }

  onSubmit() {
    this.loading = true;
    let sending = _.filter(this.employee, employee => {
      return employee.attending;
    });
    if (sending.length < 3){
      this.loading = false;
      return this.message.show(`¡Debes registrar como mínimo 3 trabajadores!`,
      {
        cssClass: "alert-danger",
        timeout: 15000
      });
    }
      let send = {
        training_id: this.training_id,
        employees: _.map(sending, "id")
      };
    this.create.register(send).subscribe(
      data => {
        this.loading = false;
        localStorage.removeItem("customer_id");
        this.route
          .navigate(["trainings"])
          .then(() => {
            this.message.show(`Capacitación registrada correctamente!`, {
              cssClass: "alert-success",
              timeout: 5000
            });
          })
          .catch(err => {
            this.message.show(`¡Error al ingresar la capacitación! ${err}`, {
              cssClass: "alert-danger",
              timeout: 5000
            });
          });
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
