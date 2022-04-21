import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: MatTable<any>;
  @Input() inputData: any[] = [];
  @Input() tableColumns: string[] = [];
  @Input() noContentLabel: string | undefined;
  @Input() noContentSubLabel: string | undefined;
  @Input() onNoContentReRoute: string | any[] | null | undefined;

  constructor() { }

  ngOnInit(): void { }

  formatAsMoney(quantity: number) : string{
    return '$' + quantity.toFixed(2);;
  }

  getConcepts(Conceptos: any[]): string{
    let res = '';

    for(let i = 0; i < Conceptos.length - 1; i++){
      res += Conceptos[i]._Descripcion + ", ";
    }

    return res + Conceptos[Conceptos.length  -1]._Descripcion;
  }
}
