import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EvaluationCreateService } from './../../../services/evaluation/evaluation-create.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-create-evaluation",
  templateUrl: "./create-evaluation.component.html",
  styleUrls: ["./create-evaluation.component.css"]
})
export class CreateEvaluationComponent implements OnInit {
  user: any;
  types: any;
  customers: any;
  technical: String;
  type: String;
  customer: String;
  date: String;
  observation: String;
  public loading = false;
  constructor(
    private http: HttpClient,
    private create: EvaluationCreateService,
    private route: Router,
    private message: FlashMessagesService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getTypes();
      this.getCustomers();
    }
  }

  getTypes() {
    return this.http
      .get(environment.url + "/evaluations-types")
      .subscribe(data => {
        this.types = data["data"];
      });
  }

  getCustomers() {
    return this.http.get(environment.url + "/customers").subscribe(data => {
      this.customers = data["data"];
    });
  }

  onSubmit() {
    this.loading = true;
    const evaluation = {
      employee_id: this.user.id,
      evaluation_type_id: this.type,
      date: this.date,
      customer_id: this.customer,
      observation: this.observation
    };
    this.create.create(evaluation).subscribe(
      data => {
        this.loading = false;
        this.route
          .navigate(["/evaluations"]).then(() => {
            this.message.show(`¡Evaluación registrada correctamente!`, {
              cssClass: "alert-success",
              timeout: 5000
            });
          }).catch(err => {
            this.message.show(`¡Error al ingresar la evaluación!`, {
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
