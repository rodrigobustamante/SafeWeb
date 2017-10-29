import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { environment } from "../../../../environments/environment";
import * as moment from "moment/moment";
import { AuthService } from "./../../../services/auth/auth.service";
import * as _ from "lodash";

@Component({
  selector: "app-medical-visit-list",
  templateUrl: "./medical-visit-list.component.html",
  styleUrls: ["./medical-visit-list.component.css"]
})
export class MedicalVisitListComponent implements OnInit {
  dtOptions: any = {};
  visits: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  date: any;
  user: any;
  constructor(public http: HttpClient, private auth: AuthService) {}

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
      this.getVisitsCompany();
    } else if (this.auth.isEmployee()) {
      this.getVisitsEmployee();
    } else {
      this.getVisits();
    }
  }

  getVisits() {
    this.http.get(environment.url + "/attentions").subscribe(data => {
      this.visits = data["data"];
      this.dtTrigger.next();
    });
  }

  getVisitsCompany() {
    this.http.get(environment.url + "/attentions").subscribe(data => {
      this.visits = data["data"];
      let id = 1;
      this.visits = _.map(this.visits, visit => {
        if (visit.customer.id === Number(this.user.customer.id)) {
          visit.id = id;
          id = id + 1;
          return visit;
        }
      });
      this.visits = _.filter(this.visits, null);
      this.dtTrigger.next();
    });
  }

  getVisitsEmployee() {
    this.http.get(environment.url + "/attentions").subscribe(data => {
      this.visits = data["data"];
      console.log(this.visits);
      let id = 1;
      this.visits = _.map(this.visits, visit => {
        if (visit.employee.id === Number(this.user.id)) {
          visit.id = id;
          id = id + 1;
          return visit;
        }
      });
      this.visits = _.filter(this.visits, null);
      this.dtTrigger.next();
    });
  }
}
