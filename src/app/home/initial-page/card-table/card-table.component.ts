import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CardTableComponent implements AfterViewInit {
  @ViewChild('tablePaginator') tablePaginator!: MatPaginator;
  @ViewChild('dataTable') dataTable!: MatTable<(Ingreso | Egreso | Traslado)>;

  @Input() inputData!: (Ingreso | Egreso | Traslado)[];
  @Input() tableColumns: string[] = [];
  @Input() noContentLabel: string | undefined;
  @Input() noContentSubLabel: string | undefined;
  @Input() onNoContentReRoute: string | any[] | null | undefined;

  public tableDataSource!: MatTableDataSource<(Ingreso | Egreso | Traslado)>;
  public expandedElement?: (Ingreso | Egreso | Traslado);
  
  constructor() {}

  ngAfterViewInit(): void {
    this.tableDataSource = new MatTableDataSource<any>(this.inputData);
    this.tableDataSource.paginator = this.tablePaginator;
  }

  refreshTable(inputData: any[]){
    this.tableDataSource.data = inputData;
    this.dataTable.renderRows();
  }

  formatAsMoney(quantity: number) : string{
    return '$' + quantity.toFixed(2);
  }

  getConcepts(Conceptos: any[]): string{
    let res = '';

    for(let i = 0; i < Conceptos.length - 1; i++){
      res += Conceptos[i]._Descripcion + ", ";
    }

    return res + Conceptos[Conceptos.length  -1]._Descripcion;
  }
}
