import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import * as _ from "lodash";
import { ActivatedRoute } from "@angular/router";
import { TrainingCreateService } from "./../../../services/training/training-create.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-training-assistance",
  templateUrl: "./training-assistance.component.html",
  styleUrls: ["./training-assistance.component.css"]
})
export class TrainingAssistanceComponent implements OnInit {
  students: any;
  student: any;
  training: any;
  constructor(
    private http: HttpClient,
    private active: ActivatedRoute,
    private attended: TrainingCreateService
  ) {}

  ngOnInit() {
    let id = this.active.snapshot.paramMap.get("id");
    this.http.get(environment.url + `/students/${id}`).subscribe(data => {
      this.students = data["students"];
      this.students = _.map(this.students, students => {
        students.attended = false;
        return students;
      });
      this.training = data["training"];
      console.log(this.students);
    });
  }

  onSubmit() {
    let send = {
      training: this.training.id,
      students: this.students
    };
    this.attended.assistance(send).subscribe(data => {
      console.log(data);
      console.log(send);
    });
  }
}
