import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';

interface CustomDataSet {
  [index: string]: ChartDataset;
}

@Component({
  selector: 'app-card-charts',
  templateUrl: './card-charts.component.html',
  styleUrls: ['./card-charts.component.scss']
})
export class CardChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @Input() rawInputData: (Ingreso | Egreso | Traslado)[] = [];
  
  public barChartLabels: string[] = [];
  public barChartData: ChartDataset[] = [];
  public barChartOptions: ChartOptions = { responsive: true, };

  constructor() { }

  ngOnInit(): void {
    this.rawInputData.sort((a, b) => b._Fecha.getTime() - a._Fecha.getTime());
    this.setChartLabels();
    this.convertInputDataToDataset();
  }

  public refreshData(inputData: (Ingreso | Egreso | Traslado)[]){
    inputData.sort((a, b) => b._Fecha.getTime() - a._Fecha.getTime());
    this.rawInputData = inputData;
    this.setChartLabels();
    this.convertInputDataToDataset();
  }

  private setChartLabels(){
    let trueIndex: number;
    this.barChartLabels = [];
    for(let i = 0; i < this.rawInputData.length; i++){
      trueIndex = this.getTrueIndex(this.rawInputData[i]._Fecha);
      if(!this.barChartLabels[trueIndex]){
        this.barChartLabels[trueIndex] = this.getReadableMonth(this.rawInputData[i]._Fecha);
      }
    }
  }

  private getReadableMonth(date: Date) : string{
    const y = date.getFullYear().toString().substring(2, 4);
    const m = date.getMonth() + 1;
    switch(m){
      case 1: return 'ENE/' + y;
      case 2: return 'FEB/' + y;
      case 3: return 'MAR/' + y;
      case 4: return 'ABR/' + y;
      case 5: return 'MAY/' + y;
      case 6: return 'JUN/' + y;
      case 7: return 'JUL/' + y;
      case 8: return 'AGO/' + y;
      case 9: return 'SEP/' + y;
      case 10: return 'OCT/' + y;
      case 11: return 'NOV/' + y;
      case 12: return 'DIC/' + y;
      default: return m + '/' + y;
    }
  }

  private convertInputDataToDataset(){
    this.barChartData.length = 0;
    let uniqueIdentifiers: string[] = [];
    let fullData: CustomDataSet = {};
    let indexName, type, color, hover: string;
    let trueIndex: number;

    for(let i = 0; i < this.rawInputData.length; i++){
      indexName = this.rawInputData[i].Emisor._Nombre;
      type = this.rawInputData[i]._TipoDeComprobante;
      color = `rgba(${type === 'E' || type === 'P' ? '255' : '100'}, ${type === 'I' || type === 'N' ? '255' : '100'}, ${type === 'T' ? '255' : '100'}, 0.65)`;
      hover = `rgba(${type === 'E' || type === 'P' ? '255' : '100'}, ${type === 'I' || type === 'N' ? '255' : '100'}, ${type === 'T' ? '255' : '100'}, 1)`;
      
      if(!fullData[indexName]){
        fullData[indexName] = {
          data: [],
          label: this.rawInputData[i].Emisor._Nombre + ' - ' + type,
          stack: this.rawInputData[i]._TipoDeComprobante,
          backgroundColor: color,
          hoverBackgroundColor: hover,
          type: 'bar'
        }

        fullData[`I ${indexName}`] = {
          data: [],
          label: this.rawInputData[i].Emisor._Nombre + " - Imp.",
          stack: 'Imp',
          backgroundColor: 'rgba(255, 100, 100, 0.65)',
          hoverBackgroundColor: 'rgba(255, 100, 100, 1)',
          type: 'bar'
        }

        for(let j = 0; j < this.barChartLabels.length; j++){
          fullData[indexName].data.push(0);
          fullData[`I ${indexName}`].data.push(0);
        }

        uniqueIdentifiers.push(this.rawInputData[i].Emisor._Nombre);
        uniqueIdentifiers.push(`I ${this.rawInputData[i].Emisor._Nombre}`);
      }

      trueIndex = this.getTrueIndex(this.rawInputData[i]._Fecha);
      (fullData[indexName].data[trueIndex] as number) += this.rawInputData[i]._SubTotal;
      (fullData[`I ${indexName}`].data[trueIndex] as number) -= Math.abs(this.rawInputData[i]._SubTotal - this.rawInputData[i]._Total);
    }

    uniqueIdentifiers.forEach(name => {
      this.barChartData.push(fullData[name]);
    });

    if(this.chart){
      this.chart.update();
    }
  }

  getTrueIndex(date: Date): number{
    const maxDate = this.rawInputData[this.rawInputData.length - 1]._Fecha;
    const yearDiff = parseInt((maxDate.getFullYear() - date.getFullYear()).toString()) * 12;
    return Math.abs(yearDiff + (maxDate.getMonth() - date.getMonth())); 
  }
}

