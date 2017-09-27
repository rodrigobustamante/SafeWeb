import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;
  username: String;
  password: String;
  constructor(private message: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogin(){
    this.loading = true;
    console.log('flag');
    setTimeout(()=> {
      this.message.show(`¡Inicio de sesión aún no implementado!, ${this.username}`, { cssClass: 'alert-warning', timeout: 5000 })
      this.loading = false;
    }, 5000)
  }

}
