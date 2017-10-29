import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { environment } from "../../../../environments/environment";
import * as moment from "moment/moment";
import { AuthService } from "./../../../services/auth/auth.service";
import * as _ from "lodash";

class Training {
  id: number;
  expositor: any;
  date: Date;
  observation: string;
  type: any;
}

@Component({
  selector: "app-training-list",
  templateUrl: "./training-list.component.html",
  styleUrls: ["./training-list.component.css"]
})
export class TrainingListComponent implements OnInit {
  dtOptions: any = {};
  trainings: Training[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  date: any;
  user: any;
  constructor(public http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.date = moment().format("YYYY-MM-DD HH:mm:ss:ms");
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.date);
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
      this.getTrainingsCompany();
    } else if (this.auth.isEmployee()) {
      this.getTrainingsEmployee();
    } else {
      this.getTrainings();
    }
  }

  getTrainings() {
    this.http.get(environment.url + "/trainings").subscribe(data => {
      this.trainings = data["data"];
      this.dtTrigger.next();
    });
  }

  getTrainingsCompany() {
    this.http.get(environment.url + "/trainings").subscribe(data => {
      this.trainings = data["data"];
      let id = 1;
      this.trainings = _.map(this.trainings, training => {
        if (training.customer.id === Number(this.user.customer.id)) {
          training.id = id;
          id = id + 1;
          return training;
        }
      });
      this.trainings = _.filter(this.trainings, null);
      this.dtTrigger.next();
    });
  }

  getTrainingsEmployee() {
    this.http.get(environment.url + `/employees/${this.user.id}/trainings`).subscribe(data => {
      this.trainings = data["data"];
      console.log(this.trainings);
      let id = 1;
      this.trainings = _.map(this.trainings, training => {
        if (training.employee.id === Number(this.user.id)) {
          training.id = id;
          id = id + 1;
          return training;
        }
      });
      this.dtTrigger.next();
    });
  }
}
