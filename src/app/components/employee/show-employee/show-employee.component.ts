import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {
  employees: any;
  employee:  any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.http.get(environment.url + "/employees").subscribe(data => {
      this.employees = data["data"];
      this.employee = _.find(this.employees, (c) => {
        return c.id === Number(id)
      })
      console.log(this.employee);
    })
  }
}