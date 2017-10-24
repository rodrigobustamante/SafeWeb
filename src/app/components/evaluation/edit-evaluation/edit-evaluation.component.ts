import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { EvaluationCreateService } from "./../../../services/evaluation/evaluation-create.service";
import { FlashMessagesService } from "angular2-flash-messages";
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
    private edit: EvaluationCreateService,
    private message: FlashMessagesService
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
      this.edit.edit(this.id, this.observation).subscribe(data => {
        this.router.navigate(["evaluations"]).then(() => {
          this.message.show(`¡Observación agregada correctamente!`, {
            cssClass: "alert-success",
            timeout: 7000
          });
        })
      });
    }
  }
}
