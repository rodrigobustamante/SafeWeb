import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import * as _ from "lodash";
import { DoctorService } from "./../../../services/doctor/doctor.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-show-medical-visit",
  templateUrl: "./show-medical-visit.component.html",
  styleUrls: ["./show-medical-visit.component.css"]
})
export class ShowMedicalVisitComponent implements OnInit {
  attention: any;
  exams: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service: DoctorService,
    private message: FlashMessagesService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    this.http.get(environment.url + `/attention/${id}`).subscribe(data => {
      this.attention = data["data"];
      this.attention = this.attention[0];
    });
    this.http.get(environment.url + `/exams/${id}`).subscribe(data => {
      this.exams = data["data"];
    });
  }

  onRegister() {
    localStorage.removeItem("attention_id");
    let id = this.route.snapshot.paramMap.get("id");
    localStorage.setItem("attention_id", id);
    this.router.navigate(["doctors/register-exam"]);
  }

  onConfirm() {
    let id = this.attention.id;
    let doctor = JSON.parse(localStorage.getItem("user"));
    let data = {
      attention_date: this.attention.date,
      doctor_name: doctor.firstName + " " + doctor.lastName,
      doctor_email: doctor.email
    };
    this.service.acceptVisit(id, data).subscribe(data => {
      this.router.navigate(["doctors/medical-visit"]).then(() => {
        this.message.show(`¡Has confirmado la atención médica!`, {
          cssClass: "alert-success",
          timeout: 5000
        });
      });
    });
  }

  onReject() {
    let id = this.attention.id;
    let doctor = JSON.parse(localStorage.getItem("user"));
    let data = {
      attention_date: this.attention.date,
      doctor_name: doctor.firstName + " " + doctor.lastName,
      doctor_email: doctor.email
    };
    this.service.rejectVisit(id, data).subscribe(data => {
      this.router.navigate(["doctors/medical-visit"]).then(() => {
        this.message.show(`¡Has rechazado la atención médica!`, {
          cssClass: "alert-danger",
          timeout: 5000
        });
      });
    });
  }
}
