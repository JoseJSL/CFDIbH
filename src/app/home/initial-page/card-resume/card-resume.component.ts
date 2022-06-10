import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CFDI } from 'src/app/service/cfdi';

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
export class CardResumeComponent implements OnInit {
  @Input() inputData!: CFDI[];

  public tableDataSource!: MatTableDataSource<CompiledCFDI>;
  public tableColumns: string[] = ['Emisor', 'Subtotal', 'Impuestos', 'Total']
  constructor() { }

  ngOnInit(): void {
    const compiledData = this.compileData(this.inputData);
    this.tableDataSource = new MatTableDataSource<CompiledCFDI>(compiledData);
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
      if (!parsedData[index]) {
        parsedData[index] = {
          Emisor: data[i].Emisor._Nombre,
          Subtotal: data[i]._SubTotal,
          Total: data[i]._SubTotal,
          Tipo: data[i]._TipoDeComprobante,
          Impuestos: 0,
        }
      } else {
        parsedData[index].Subtotal += data[i]._SubTotal;
        parsedData[index].Total += data[i]._Total;
      }

      Subtotal += data[i]._SubTotal;
      Total += data[i]._Total;
    }

    Impuestos = Total - Subtotal;

    const compiledData: CompiledCFDI[] = [];
    for(var key in parsedData){
      parsedData[key].Impuestos = parsedData[key].Total - parsedData[key].Subtotal;
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
    if(currency >= 0 ){
      return '$' + currency.toFixed(2);
    } else {
      return '-$' + Math.abs(currency).toFixed(2);
    }
  }
}
