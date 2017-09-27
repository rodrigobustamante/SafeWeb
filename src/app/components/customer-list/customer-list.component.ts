import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  users: any;
  headers: any;
  constructor(public http:HttpClient) {
    this.headers = new Headers();
    this.headers.append('content-type', 'application/json');
    this.test()
  }
  
  ngOnInit() {
    
  }
  call(){
    this.http.get("http://c3f1e6fc.ngrok.io/users").subscribe(data => {
      this.users = data['data']
      console.log(this.users)
    })
  }
  test(){
    let data = {
      "hello": "moto"
    }
    this.http.post("http://c3f1e6fc.ngrok.io", data).subscribe(data => {
      console.log(JSON.parse(data.toString()))
    })
  }
}
