import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { environment } from "../../../../environments/environment";
import { AuthService } from "./../../../services/auth/auth.service";
import * as _ from "lodash";

class Evaluation {
  id: number;
  date: any;
  observation: string;
  type: string;
}

@Component({
  selector: "app-evaluation-list",
  templateUrl: "./evaluation-list.component.html",
  styleUrls: ["./evaluation-list.component.css"]
})
export class EvaluationListComponent implements OnInit {
  dtOptions: any = {};
  evaluations: Evaluation[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  user: any;
  constructor(public http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      columnDefs: [{ orderable: false, targets: 1 }],
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
      this.http.get(environment.url + "/evaluations").subscribe(data => {
        this.evaluations = data["data"];
        let id = 1;
        this.evaluations = _.map(this.evaluations, evaluation => {
          if (evaluation.customer.id === Number(this.user.customer.id)) {
            evaluation.id = id;
            id = id + 1;
            return evaluation;
          }
        });
        this.evaluations = _.filter(this.evaluations, null);
        this.dtTrigger.next();
      });
    } else {
      this.http.get(environment.url + "/evaluations").subscribe(data => {
        this.evaluations = data["data"];
        this.dtTrigger.next();
      });
    }
  }
}
