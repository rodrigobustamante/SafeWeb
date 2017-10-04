import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loading = false;
  username: String;
  password: String;
  user: any;
  headers: any;
  constructor(
    public http: HttpClient,
    private message: FlashMessagesService,
    private router: Router,
    private auth: AuthService
  ) {
    this.headers = new Headers();
    this.headers.append("content-type", "application/json");
  }
  ngOnInit() {
    if (localStorage.getItem("user") === null) {
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['']); 
      return true;
    }
  }

  onLogin() {
    this.loading = true;
    if (this.username == undefined || this.password == undefined) {
      this.loading = false;
      this.message.show(`¡El usuario y la contraseña son requeridos!`, {
        cssClass: "alert-danger",
        timeout: 5000
      });
      return false;
    }
    const employee = {
      username: this.username,
      password: this.password
    };
    this.auth.loginUser(employee).subscribe(data => {
      this.loading = false
      console.log(data.employee)
      if(data.employee){
        this.auth.storeUser(data.employee)
        this.router.navigate(['/']).then(() => {
          this.message.show(`¡Bienvenido ${this.username}!`, { cssClass: 'alert-success', timeout: 5000 })
        }).catch((err) => {
          this.message.show(`Error: ${err}`, { cssClass: 'alert-danger', timeout: 5000 }) 
        });
      }else{
        this.router.navigate(['/login']).then(()=> {
          this.message.show(`Error con el servidor`, { cssClass: 'alert-danger', timeout: 5000 })
        }).catch(err => {
          this.message.show(`Error: ${err}`, { cssClass: 'alert-danger', timeout: 5000 })
        });
      }
    }, err => {
      this.loading = false;
      this.message.show('Usuario o contraseña incorrecto', { cssClass: 'alert-danger', timeout: 15000 })
    });
  }
}
