import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "./../../services/auth/auth.service";
import { AdministratorGuard } from "./../../guards/roles/administrator.guard";
import { CompanyGuard } from "./../../guards/roles/company.guard";
import { DoctorGuard } from "./../../guards/roles/doctor.guard";
import { EmployeeGuard } from "./../../guards/roles/employee.guard";
import { EngineerGuard } from "./../../guards/roles/engineer.guard";
import { SupervisorGuard } from "./../../guards/roles/supervisor.guard";
import { TechnicalGuard } from "./../../guards/roles/technical.guard";

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
    public auth: AuthService
  ) {}

  ngOnInit() {
    if (this.getSession() !== null) {
      this.user  = this.getSession();
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
