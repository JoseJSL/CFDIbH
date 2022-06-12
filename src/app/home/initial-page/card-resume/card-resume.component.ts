import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CFDI, getTotalImpuestos } from 'src/app/model/cfdi3.3';

interface CompiledCFDI {
  Emisor: string,
  Subtotal: number,
  Impuestos: number,
  Total: number,
  Tipo: string,
}

interface CustomCompiledCFDIArray {
  [key: string]: CompiledCFDI;
}


@Component({
  selector: 'app-card-resume',
  templateUrl: './card-resume.component.html',
  styleUrls: ['./card-resume.component.scss']
})
export class CardResumeComponent implements AfterViewInit {
  @Input() inputData!: CFDI[];

  @ViewChild('tablePaginator') tablePaginator!: MatPaginator;

  public tableDataSource!: MatTableDataSource<CompiledCFDI>;
  public tableColumns: string[] = ['Emisor', 'Subtotal', 'Impuestos', 'Total']
  constructor() { }

  ngAfterViewInit(): void {
    const compiledData = this.compileData(this.inputData);
    this.tableDataSource = new MatTableDataSource<CompiledCFDI>(compiledData);
    this.tableDataSource.paginator = this.tablePaginator;
  }

  refreshData(data: CFDI[]) {
    const compiledData = this.compileData(data); 
    this.tableDataSource.data = compiledData;
  }

  compileData(data: CFDI[]): CompiledCFDI[]{
    const parsedData: CustomCompiledCFDIArray = {};
    let Subtotal = 0, Total = 0, Impuestos = 0;

    for (let i = 0; i < data.length; i++) {
      const index = data[i].Emisor._Nombre + data[i]._TipoDeComprobante;
      const indexImpuestos = getTotalImpuestos(data[i]);

      if (!parsedData[index]) {
        parsedData[index] = {
          Emisor: data[i].Emisor._Nombre,
          Subtotal: data[i]._SubTotal,
          Total: data[i]._Total,
          Tipo: data[i]._TipoDeComprobante,
          Impuestos: indexImpuestos,
        }
      } else {
        parsedData[index].Subtotal += data[i]._SubTotal;
        parsedData[index].Total += data[i]._Total;
        parsedData[index].Impuestos += indexImpuestos;
      }

      Subtotal += data[i]._SubTotal;
      Impuestos += indexImpuestos;
      Total += data[i]._Total;
    }

    const compiledData: CompiledCFDI[] = [];
    for(var key in parsedData){
      compiledData.push(parsedData[key]);
    }

    compiledData.push({
      Emisor: 'Total',
      Subtotal: Subtotal,
      Total: Total,
      Impuestos: Impuestos,
      Tipo: 'X',
    })

    return compiledData;
  }

  formatAsCurrency(currency: number): string {
    return '$' + Math.abs(currency).toFixed(2);
  }
}
