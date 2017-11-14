import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import * as _ from "lodash";

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
    private http: HttpClient
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
}
