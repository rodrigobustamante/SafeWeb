import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-register-attendees',
  templateUrl: './register-attendees.component.html',
  styleUrls: ['./register-attendees.component.css']
})
export class RegisterAttendeesComponent implements OnInit {
  customer_id: any = localStorage.getItem("customer_id");
  customers:   any;
  customer:    any;
  employees:   any;
  employee:    any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.url + "/customers").subscribe(data => {
      this.customers = data["data"];
      this.customer = _.find(this.customers, (c) => {
        return c.id === Number(this.customer_id)
      })
    })
    this.getCustomers()
  }

  getCustomers(){
    this.http.get(environment.url + "/employees").subscribe(data => {
      this.employees = data["data"];
      this.employee = _.map(this.employees, (employee) => {
        employee.attending = false; 
        if (employee.customer.id === Number(this.customer_id)) {
          return employee;
        } 
      })
      this.employee = _.filter(this.employee, null)
    })
  }

  onSubmit(){
    let sending = _.filter(this.employee, (employee) => {
      return employee.attending
    })
    let send = {
      customer_id : this.customer_id,
      employees   : _.map(sending, 'id')
    }
    
    // console.log(send)
  }
}
