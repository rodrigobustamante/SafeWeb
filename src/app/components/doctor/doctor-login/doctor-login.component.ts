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
  username: String;
  password: String;
  constructor(
    public http: HttpClient,
    private message: FlashMessagesService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("user") === null) {
      this.router.navigate(["/login"]);
    } else {
      this.router.navigate([""]);
      return true;
    }
  }

  onLogin() {
    this.loading = true;
    let validate = true;
    validate = this.auth.validate(this.username, this.password);
    if (!validate) {
      this.loading = false;
      this.message.show(`¡El usuario y la contraseña son requeridos!`, {
        cssClass: "alert-danger",
        timeout: 5000
      });
      return false;
    }
    const doctor = {
      username: this.username,
      password: this.password
    };
    this.auth.loginDoctor(doctor).subscribe(
      data => {
        this.loading =false;
      }
    )
  }
}
