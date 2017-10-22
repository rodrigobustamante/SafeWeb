import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "./../../../services/auth/auth.service";

@Component({
  selector: "app-doctor-login",
  templateUrl: "./doctor-login.component.html",
  styleUrls: ["./doctor-login.component.css"]
})
export class DoctorLoginComponent implements OnInit {
  loading = false;
  rut: String;
  password: String;
  icm: Number;
  constructor(
    public http: HttpClient,
    private message: FlashMessagesService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("user") === null) {
      this.router.navigate(["/login/doctor"]);
    } else {
      this.router.navigate([""]);
      return true;
    }
  }

  onLogin() {
    console.log("aksdkas");
    this.loading = true;
    let validate = true;
    validate = this.auth.validateDoctor(this.rut, this.icm, this.password);
    if (!validate) {
      this.loading = false;
      this.message.show(`¡El rut, el ICM y la contraseña son requeridos!`, {
        cssClass: "alert-danger",
        timeout: 5000
      });
      return false;
    }
    const doctor = {
      rut: this.rut,
      icm: this.icm,
      password: this.password
    };
    console.log(doctor);
    // this.auth.loginDoctor(doctor).subscribe(data => {
    //   this.loading = false;
    // });
  }
}
