import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import * as _ from "lodash";
import * as pdf from "jspdf";
import * as momemt from "moment/moment";

@Component({
  selector: "app-show-training",
  templateUrl: "./show-training.component.html",
  styleUrls: ["./show-training.component.css"]
})
export class ShowTrainingComponent implements OnInit {
  training: any;
  students: any;
  type: any;
  user: any;
  aux: any;
  constructor(
    private route: Router,
    private active: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    let id = this.active.snapshot.paramMap.get("id");
    this.getStudents(id);
    this.getTraining(id);
  }

  getStudents(id) {
    this.http.get(environment.url + `/students/${id}`).subscribe(data => {
      this.students = data["students"];
      this.students = _.map(this.students, stundent => {
        if (
          this.user.rut === stundent.employee.rut &&
          stundent.state.state === "Asistido"
        ) {
          this.aux = true;
        }
        return stundent;
      });
      console.log(this.aux);
    });
  }

  getTraining(id) {
    this.http.get(environment.url + `/trainings/${id}`).subscribe(data => {
      this.training = data;
      console.log(this.training);
    });
  }

  toPDF() {
    const doc = new pdf();
    doc.setFontSize(15);
    doc.text(
      `Safe S.A. certifica que la persona con rut ${this.user.rut} y nombre`,
      20,
      10
    );
    doc.text(
      `${this.user.firstName} ${this.user.lastName} de la empresa ${this
        .training.customer.name},`,
      20,
      20
    );
    doc.text(
      `asistió a la capacitación ${this.training.name} realizada el `,
      20,
      30
    );
    doc.text(
      `${momemt(this.training.date).format(
        "DD-MM-YY"
      )}. por el expositor ${this.training.expositor.first_name} ${this.training
        .expositor.last_name}`,
      20,
      40
    );
    doc.save(`${this.training.name}.pdf`);
  }
}
