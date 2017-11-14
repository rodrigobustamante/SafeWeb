import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../../environments/environment";
import { DoctorService } from "./../../../services/doctor/doctor.service";

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
  constructor(
    private router: Router,
    private http: HttpClient,
    private doctor: DoctorService
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
    let exam = {
      attention_id: this.attention_id,
      date: this.date,
      type: this.type,
      observation: this.observation
    };
    console.log(exam);
    this.doctor.createExam(exam).subscribe(data => {
      this.router.navigate([`doctors/attention/${this.attention_id}`]);
    });
  }
}
