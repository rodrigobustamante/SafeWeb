import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { environment } from "../../../../environments/environment";
import { AuthService } from "./../../../services/auth/auth.service";
import * as _ from "lodash";

class Employee {
  id: number;
  rut: string;
  name: string;
  address: string;
  zone: string;
}

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  dtOptions: any = {};
  employees: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  user: any;
  constructor(public http: HttpClient, private auth: AuthService) {
    this.headers = new Headers();
    this.headers.append("content-type", "application/json");
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      language: {
        processing: "Procesando...",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en esta tabla",
        info:
          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        infoPostFix: "",
        search: "Buscar:",
        url: "",
        loadingRecords: "Cargando...",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
        },
        aria: {
          sortAscending:
            ": Activar para ordenar la columna de manera ascendente",
          sortDescending:
            ": Activar para ordenar la columna de manera descendente"
        }
      }
    };
    if (this.auth.isCompany()) {
      this.http.get(environment.url + "/employees").subscribe(data => {
        this.employees = data["data"];
        let id = 1;
        this.employees = _.map(this.employees, employee => {
          if (employee.customer.id === Number(this.user.customer.id)) {
            employee.id = id;
            id = id + 1;
            return employee;
          }
        });
        this.employees = _.filter(this.employees, null);
        this.dtTrigger.next();
      });
    } else {
      this.http.get(environment.url + "/employees").subscribe(data => {
        this.employees = data["data"];
        this.dtTrigger.next();
      });
    }
    // this.http.get(environment.url + "/employees").subscribe(data => {
    //   this.employees = data["data"];
    //   console.log(this.employees);
    //   this.dtTrigger.next();
    // });
  }
}
