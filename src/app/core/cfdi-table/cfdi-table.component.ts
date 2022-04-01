import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';

@Component({
  selector: 'cfdi-table',
  templateUrl: './cfdi-table.component.html',
  styleUrls: ['./cfdi-table.component.scss']
})
export class CfdiTableComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: MatTable<any>;
  @Input() inputData: (Ingreso | Egreso | Traslado)[] = [];
  public tableColumns: string[] = ['concepto', 'emisor', 'receptor', 'subtotal'];
  constructor() { }

  ngOnInit(): void { }

  addDocuments(data: (Ingreso | Egreso | Traslado)[]){
    this.inputData.push(...data);
    this.dataTable.renderRows();
  }

  sortData(ev: Sort){
    switch(ev.active){
      case('concepto'):
        break;
      case('emisor'):
        break;     
      case('receptor'):
        break;
      case('subtotal'):
        if(ev.direction == 'asc'){
          this.inputData.sort((a, b) => a._SubTotal - b._SubTotal);
        } else {
          this.inputData.sort((a, b) => b._SubTotal - a._SubTotal);
        }
        break;
    }
  }

}
