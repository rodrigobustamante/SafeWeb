import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../../environments/environment";
import { DoctorService } from "./../../../services/doctor/doctor.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-register-exam",
  templateUrl: "./register-exam.component.html",
  styleUrls: ["./register-exam.component.css"]
})
export class RegisterExamComponent implements OnInit {
  attention_id: any;
  date: any;
  type: any;
  types: any;
  observation: any;
  public loading = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private doctor: DoctorService,
    private message: FlashMessagesService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("attention_id")) {
      this.attention_id = localStorage.getItem("attention_id");
      this.http.get(environment.url + "/exams/types").subscribe(data => {
        this.types = data["data"];
        console.log(this.types);
      });
    } else {
      return this.router.navigate(["doctors/medical-visit-list"]);
    }
  }

  onRegister() {
    this.loading = true;
    let exam = {
      attention_id: this.attention_id,
      date: this.date,
      type: this.type,
      observation: this.observation
    };
    let validate = this.doctor.validateRegisterExam(exam);
    if (validate != true) {
      this.loading = false;
      this.message.show(`¡${validate}!`, {
        cssClass: "alert-danger",
        timeout: 7000
      });
    } else {
      this.doctor.createExam(exam).subscribe(data => {
        this.loading = false;
        this.router.navigate([`doctors/attention/${this.attention_id}`]);
      });
    }
    console.log(validate);
  }
}
