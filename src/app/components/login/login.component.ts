import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

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
    private router: Router
  ) {
    this.headers = new Headers();
    this.headers.append("content-type", "application/json");
  }
  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.router.navigate([""]);
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
    this.http.post("http://localhost:4567/login", employee).subscribe(data => {
      this.user = data["employee"];
      this.loading = false;
      while (this.user !== undefined) {
        console.log(this.user);
        this.storeUser(this.user);
        return this.router.navigate([""]).then(() => {
          this.message.show(`¡Usuario correcto! Bienvenido ${this.user.firstName} ${this.user.lastName}`,
           { cssClass: "alert-success", timeout: 5000 });
        }).catch(err => {
          this.message.show(`¡Error!. ${err}`, {
            cssClass: "alert-danger",
            timeout: 5000
          });
        });
      }
    },err => {
      this.message.show(`¡Error, usuario o contraseña incorrecto!`, {
        cssClass: "alert-danger",
        timeout: 5000});
      console.log(err);
      this.loading = false;
      }
    );
  }

  storeUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user));
  }
}
