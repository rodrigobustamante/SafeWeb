import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainingCreateService } from './../../../services/training/training-create.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
user: any;
types: any;
name: String;
expositors: any;
expositor: any;
customers: any;
customer;
type: String;
date: String;
observation: String;
public loading = false;
constructor(
  private http: HttpClient,
  private create: TrainingCreateService,
  private route: Router,
  private message: FlashMessagesService
) {}

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getTypes();
      this.getExpositors();
      this.getCustomers();
    }
  }

  getExpositors(){
    return this.http
    .get(environment.url + "/expositors")
    .subscribe(data => {
      this.expositors = data["data"];
    })
  }

  getTypes() {
    return this.http
      .get(environment.url + "/trainings/types")
      .subscribe(data => {
        this.types = data["data"];
      });
  }

  getCustomers(){
    return this.http
      .get(environment.url + "/customers")
      .subscribe(data => {
        this.customers = data["data"];
      })
  }

  onSubmit(){
    this.loading = true;
    const training = {
      name: this.name,
      expositor_id: this.expositor,
      training_type_id: this.type,
      customer_id: this.customer,
      date: this.date,
      observation: this.observation
    };
    console.log(training);
    this.create.create(training).subscribe(
      data => {
        this.loading = false;
        localStorage.removeItem("customer_id");
        localStorage.setItem("customer_id", this.customer);
        this.route.navigate(["trainings/create/attendees"]).then(() => {
          
        }).catch(err => {
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
    )
  }
}