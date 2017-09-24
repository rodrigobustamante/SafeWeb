import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerListService {

  constructor(private http:Http) { }

  getCustomers(){
    return this.http.get('').map(res => res.json());
  }
}