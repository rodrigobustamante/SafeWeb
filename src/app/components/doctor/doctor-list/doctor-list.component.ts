import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { Router } from "@angular/router";
import { environment } from "./../../../../environments/environment";

@Component({
  selector: "app-doctor-list",
  templateUrl: "./doctor-list.component.html",
  styleUrls: ["./doctor-list.component.css"]
})
export class DoctorListComponent implements OnInit {
  dtOptions: any = {};
  doctors: any;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    private message: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
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
    this.getDoctors();
  }

  getDoctors() {
    this.http.get(environment.node).subscribe(data => {
      this.doctors = data["data"];
      console.log(this.doctors)
      this.dtTrigger.next();
    });
  }
}
