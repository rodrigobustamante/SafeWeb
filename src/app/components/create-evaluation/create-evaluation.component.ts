import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.css']
})
export class CreateEvaluationComponent implements OnInit {
  user: any;
  types: any;
  customers: any;
  technical: String;
  type: String;
  customer: String;
  date: String;
  observation:String;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getTypes();
      this.getCustomers();
    }
  }

  getTypes(){
    return this.http.get('http://localhost:4567/evaluations/types').subscribe(data => {
      this.types = data['data']
      console.log(this.types)
    })
  }

  getCustomers(){
    return this.http.get('http://localhost:4567/evaluations/types').subscribe(data => {
      this.customers = data['data']
      console.log(this.customers)
    }) 
  }

  onSubmit(){
    const evaluation = {
      employee_id: this.user.id,
      evaluation_type_id: this.type,
      date: this.date,
      customer_id: this.customer,
      observation: this.observation
    }
    console.log(evaluation)
  }
}
