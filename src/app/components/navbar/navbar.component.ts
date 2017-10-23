import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "./../../services/auth/auth.service";
import { DoctorGuard } from "./../../guards/roles/doctor.guard";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public user: any;
  public session: any;
  constructor(
    public route: Router,
    public message: FlashMessagesService,
    public auth: AuthService,
    public doctor: DoctorGuard
  ) {}

  ngOnInit() {
    if (this.getSession() !== null) {
      this.user = this.getSession();
      this.session = true;
    }
  }

  getSession() {
    return JSON.parse(localStorage.getItem("user"));
  }

  onLogout() {
    this.auth.logout();
  }
}
