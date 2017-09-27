import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  date: any;

  constructor(private router:Router) { }

  ngOnInit() {
      if (localStorage.getItem("user") === null) {
        this.router.navigate(['/login']);
      }else{
        this.date = moment().lang('es').format('DD MMMM YYYY')
      }
    }
}
