import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: any;
  public session: any;
  constructor(public route: Router, public message: FlashMessagesService, public auth:AuthGuard) { }

  ngOnInit() {
    if(localStorage.getItem('user') !== null){
      this.user    = this.getSession();
      this.session = true;
    }
  }

  getSession(){
    return JSON.parse(localStorage.getItem('user'));
  }

  onLogout(){
    localStorage.clear();
    this.route.navigate(['/login']).then(() => {
      this.message.show(`Has cerrado sesión correctamente`, { cssClass: 'alert-success', timeout: 5000 });
    }).catch(err => {
      this.message.show(`Error: ${err}`, { cssClass: 'alert-danger', timeout: 5000 });
    });
  }
}