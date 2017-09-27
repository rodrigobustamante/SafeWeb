import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.css']
})
export class CreateEvaluationComponent implements OnInit {

  technical: String;
  type: String;
  customer: String;
  date: String;
  observation:String;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    const evaluation = {
      employee_id: this.technical,
      evaluation_type_id: this.type,
      date: this.date,
      customer_id: this.customer,
      observation: this.observation
    }
    console.log(evaluation)
  }

}
