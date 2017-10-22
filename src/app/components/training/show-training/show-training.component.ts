import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";
import * as _ from "lodash";

@Component({
  selector: "app-show-training",
  templateUrl: "./show-training.component.html",
  styleUrls: ["./show-training.component.css"]
})
export class ShowTrainingComponent implements OnInit {
  training: any;
  students: any;
  type:     any;
  constructor(
    private route: Router,
    private active: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    let id = this.active.snapshot.paramMap.get("id");
    this.getStudents(id)
    this.getTraining(id)
  }

  getStudents(id){
    this.http.get(environment.url + `/students/${id}`).subscribe(data => {
      this.students = data["students"];
      this.students = _.map(this.students, students => {
        students.attended = false;
        return students;
      });
      console.log(this.students);
    });
  }

  getTraining(id){
    this.http.get(environment.url + `/trainings/${id}`).subscribe(data => {
      this.training = data
      console.log(this.training);
    });
  }
}
