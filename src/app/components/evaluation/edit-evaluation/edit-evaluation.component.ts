import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { EvaluationCreateService } from "./../../../services/evaluation/evaluation-create.service";

@Component({
  selector: "app-edit-evaluation",
  templateUrl: "./edit-evaluation.component.html",
  styleUrls: ["./edit-evaluation.component.css"]
})
export class EditEvaluationComponent implements OnInit {
  evaluation: any;
  observation: any;
  observation_new: any;
  observation_old: any;
  id: any;
  constructor(
    private router: Router,
    private active: ActivatedRoute,
    private http: HttpClient,
    private edit: EvaluationCreateService
  ) {}

  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get("id");
    this.http
      .get(environment.url + `/evaluations/${this.id}`)
      .subscribe(data => {
        console.log(data);
        this.evaluation = data;
        this.observation_old = this.evaluation.observation;
      });
  }

  onSubmit() {
    if (this.observation_new.length > 0) {
      this.observation =
        "Observación del técnico: " +
        this.observation_old + "\n" +
        "Observación del ingeniero: " + this.observation_new;
      console.log(this.observation)
        this.edit.edit(this.id, this.observation).subscribe(data => {
        console.log("data");
      });
    }
  }
}
