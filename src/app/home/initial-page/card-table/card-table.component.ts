import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements AfterViewInit {
  @ViewChild('dataTable') dataTable!: MatTable<any>;
  @Input() inputData!: any[];
  @ViewChild('tablePaginator') tablePaginator!: MatPaginator;
  public tableDataSource!: MatTableDataSource<any>;

  @Input() tableColumns: string[] = [];
  @Input() noContentLabel: string | undefined;
  @Input() noContentSubLabel: string | undefined;
  @Input() onNoContentReRoute: string | any[] | null | undefined;

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
