import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import * as _ from "lodash";
import * as pdf from "jspdf";

@Component({
  selector: "app-show-evaluation",
  templateUrl: "./show-evaluation.component.html",
  styleUrls: ["./show-evaluation.component.css"]
})
export class ShowEvaluationComponent implements OnInit {
  evaluations: any;
  evaluation: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    this.http.get(environment.url + "/evaluations").subscribe(data => {
      this.evaluations = data["data"];
      this.evaluation = _.find(this.evaluations, e => {
        return e.id === Number(id);
      });
      console.log(this.evaluation);
    });
  }

  toPdf() {
    const doc = new pdf();
    doc.setFontSize(20);
    doc.text(
      `Evaluación de ${this.evaluation.evaluationType.type} de la empresa ${this
        .evaluation.customer.name}`, 20, 20);
    doc.line(1, 1 ,1, 1)
    doc.setFontSize(20);
    doc.text(`Fecha de la evaluacion: ${this.evaluation.date}.`, 20, 20);
    doc.text("Observaciones:", 20, 20);
    doc.setFontSize(16);
    doc.text(`${this.evaluation.observation}.`, 20, 20);
    doc.save(`${this.evaluation.customer.name}.pdf`);
  }
}
