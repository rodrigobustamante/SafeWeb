import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  date: any;

  constructor() { }

  ngOnInit() {
    this.date = moment().lang('es').format('DD MMMM YYYY')
  }
}
