import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
      state('collapsed', style({height: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 0.5)')),
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

  @Output() deleteDocument = new EventEmitter<string>();

  public tableDataSource!: MatTableDataSource<(Ingreso | Egreso | Traslado)>;
  public expandedElement?: string;
  public screenWidth = window.innerWidth;
  
  constructor() {}

  ngAfterViewInit(): void {
    if(this.screenWidth < 576) this.tableColumns.length = this.tableColumns.length - 1;
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

  changeExpandedElement(_NoCertificado: string){
    console.log(this.expandedElement + ' -- ' + _NoCertificado);

    if(this.expandedElement !== _NoCertificado){
      this.expandedElement = _NoCertificado;
    } else {
      this.expandedElement = undefined; 
    }
  }

  emitDeleteDocument(_NoCertificado: string){
    this.deleteDocument.emit(_NoCertificado);
  }
}
