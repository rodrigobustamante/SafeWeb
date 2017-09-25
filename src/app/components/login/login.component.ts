import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  constructor() { }

  ngOnInit() {
  }

  onLogin(){
    this.loading = true;
    console.log('flag');
    setTimeout(()=> {
      this.loading = false;
    }, 5000)
  }

}
