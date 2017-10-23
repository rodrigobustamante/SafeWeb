import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DoctorGuard } from "./../../guards/roles/doctor.guard";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(private router: Router, private doctor: DoctorGuard) {}

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    if (this.doctor) {
      this.router.navigate(["doctors/medical-visit"]);
    }
  }

  onEnter() {
    location.reload();
  }
}
