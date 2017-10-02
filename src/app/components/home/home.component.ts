import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
}