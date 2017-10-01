import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public route: Router, public message: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogout(){
    localStorage.clear();
    this.route.navigate(['']).then(()=> {
      this.message.show(`Has cerrado sesión correctamente`, { cssClass: 'alert-success', timeout: 5000 })
    }).catch(err => {
      this.message.show(`Error ${err}`, { cssClass: 'alert-danger', timeout: 5000 })
    })
  }

}
