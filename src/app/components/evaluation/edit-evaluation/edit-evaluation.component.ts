import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.css']
})
export class EditEvaluationComponent implements OnInit {
  id : any;
  constructor(private router: Router, private active: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get("id")
    this.http.get("test")
  }

}
