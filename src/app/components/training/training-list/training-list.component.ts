import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { environment } from '../../../../environments/environment';

class Training{
  id: number;
  expositor: any;
  date: any;
  observation: string;
  type: any;
}

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  dtOptions: any = {};
  trainings: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    console.log("asdas")
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 20,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'copy',
          text: 'Copiar'
        },
        {
          extend: 'csv',
          text: 'Exportar a CSV',
          fieldSeparator: ';',
          exportOption: [1, 2, 3]
        }
      ],
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
    this.http.get(environment.url + "/trainings").subscribe(data => {
      this.trainings = data["data"];
      console.log(this.trainings);
      this.dtTrigger.next();
    });
  }
}