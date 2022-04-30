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
  
  private minOfLabel: number = 0;
  public isLabelInYears: boolean = true;
  public barChartLabels: string[] = [];
  public barChartData: ChartDataset[] = [];
  public barChartOptions: ChartOptions = { responsive: true, };

  constructor() { }

  ngOnInit(): void {
    this.rawInputData.sort((a, b) => a._Fecha.getTime() - b._Fecha.getTime());
    this.setChartLabels();
    this.convertInputDataToDataset();
  }

  public refreshData(inputData: (Ingreso | Egreso | Traslado)[]){
    inputData.sort((a, b) => a._Fecha.getTime() - b._Fecha.getTime());
    this.rawInputData = inputData;
    this.setChartLabels();
    this.convertInputDataToDataset();
  }

  private setChartLabels(){
    this.barChartLabels.length = 0;

    if(this.rawInputData[0]._Fecha.getFullYear() === this.rawInputData[this.rawInputData.length - 1]._Fecha.getFullYear()){
      for(let i = this.rawInputData[0]._Fecha.getMonth(); i <= this.rawInputData[this.rawInputData.length - 1]._Fecha.getMonth(); i++){
        this.barChartLabels.push(this.getReadableMonth(i + 1));
        this.isLabelInYears = false;
      }

      this.minOfLabel = this.rawInputData[0]._Fecha.getMonth();
    } else {
      for(let i = this.rawInputData[0]._Fecha.getFullYear(); i <= this.rawInputData[this.rawInputData.length - 1]._Fecha.getFullYear(); i++){
        this.barChartLabels.push(this.rawInputData[i]._Fecha.getFullYear().toString());
        this.isLabelInYears = true;
      }

      this.minOfLabel = this.rawInputData[0]._Fecha.getFullYear();
    }
  }

  private getReadableMonth(month: number) : string{
    switch(month){
      case 1: return 'Enero';
      case 2: return 'Febrero';
      case 3: return 'Marzo';
      case 4: return 'Abril';
      case 5: return 'Mayo';
      case 6: return 'Junio';
      case 7: return 'Julio';
      case 8: return 'Agosto';
      case 9: return 'Septiembre';
      case 10: return 'Octubre';
      case 11: return 'Noviembre';
      case 12: return 'Diciembre';
      default: return '';
    }
  }

  private convertInputDataToDataset(){
    this.barChartData.length = 0;
    let uniqueIdentifiers: string[] = [];
    let fullData: CustomDataSet = {};
    let indexName: string;
    let trueIndex: number;

    for(let i = 0; i < this.rawInputData.length; i++){
      indexName = this.rawInputData[i].Emisor._Nombre;

      if(!fullData[indexName]){
        fullData[indexName] = {
          data: [],
          label: this.rawInputData[i].Emisor._Nombre + " - Subtotal",
          stack: 'A',
          type: 'bar'
        }

        fullData[`I ${indexName}`] = {
          data: [],
          label: this.rawInputData[i].Emisor._Nombre + " - Impuestos",
          stack: 'A',
          type: 'bar'
        }

        for(let j = 0; j < this.barChartLabels.length; j++){
          fullData[indexName].data.push(0);
          fullData[`I ${indexName}`].data.push(0);
        }

        uniqueIdentifiers.push(this.rawInputData[i].Emisor._Nombre);
        uniqueIdentifiers.push(`I ${this.rawInputData[i].Emisor._Nombre}`);
      }

      trueIndex = this.isLabelInYears ? this.rawInputData[i]._Fecha.getFullYear() - this.minOfLabel : this.rawInputData[i]._Fecha.getMonth() - this.minOfLabel;

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
}

