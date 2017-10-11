import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {
  customers: any;
  customer:  any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.http.get(environment.url + "/customers").subscribe(data => {
      this.customers = data["data"];
      this.customer = _.find(this.customers, (c) => {
        return c.id === Number(id)
      })
      console.log(this.customer);
    })
  }

}
