import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DoctorGuard } from "./../../guards/roles/doctor.guard";
import { AuthService } from "./../../services/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(private router: Router, private doctor: DoctorGuard, private auth: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

  onEnter() {
    location.reload();
  }
}
