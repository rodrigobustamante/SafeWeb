import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-show-evaluation',
  templateUrl: './show-evaluation.component.html',
  styleUrls: ['./show-evaluation.component.css']
})
export class ShowEvaluationComponent implements OnInit {
  evaluation: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.http.get(environment.url + "/evaluations/" + id).subscribe(data => {
      this.evaluation = data["data"];
      console.log(this.evaluation);
    })
  }

}
