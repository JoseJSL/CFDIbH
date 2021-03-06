import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CFDI } from 'src/app/model/cfdi3.3';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss'],
  animations: [
    trigger('exp', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: '0' })),
      transition('expanded <=> collapsed', [animate('225ms')]),
    ]),
  ],
})
export class CardTableComponent implements AfterViewInit {
  @ViewChild('tablePaginator') tablePaginator!: MatPaginator;
  @ViewChild('dataTable') dataTable!: MatTable<CFDI>;

  @Input() inputData!: CFDI[];
  @Input() tableColumns: string[] = [];
  @Input() noContentLabel: string | undefined;
  @Input() noContentSubLabel: string | undefined;
  @Input() onNoContentReRoute: string | any[] | null | undefined;

  @Output() deleteDocument = new EventEmitter<string>();

  public tableDataSource!: MatTableDataSource<CFDI>;
  public expandedElement?: string;
  public screenWidth = window.innerWidth;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.screenWidth < 576) this.tableColumns.length = this.tableColumns.length - 1;
    this.tableDataSource = new MatTableDataSource<CFDI>(this.inputData);
    this.tableDataSource.paginator = this.tablePaginator;
  }

  refreshTable(inputData: any[]) {
    this.tableDataSource.data = inputData;
    this.dataTable.renderRows();
  }

  formatAsMoney(quantity: number): string {
    return '$' + quantity.toFixed(2);
  }

  getConcepts(Conceptos: any[]): string {
    let res = '';

    for (let i = 0; i < Conceptos.length - 1; i++) {
      res += Conceptos[i]._Descripcion + ", ";
    }

    return res + Conceptos[Conceptos.length - 1]._Descripcion;
  }

  changeExpandedElement(_ID: string) {
    if (this.expandedElement !== _ID) {
      this.expandedElement = _ID;
    } else {
      this.expandedElement = undefined;
    }
  }

  emitDeleteDocument(_ID: string) {
    this.deleteDocument.emit(_ID);
  }
}
