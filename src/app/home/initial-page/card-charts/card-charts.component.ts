import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, } from 'chart.js';
import {  } from 'ng2-charts';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';

@Component({
  selector: 'app-card-charts',
  templateUrl: './card-charts.component.html',
  styleUrls: ['./card-charts.component.scss']
})
export class CardChartsComponent implements OnInit {
  @Input() rawInputData: (Ingreso | Egreso | Traslado)[] = [];

  public barChartOptions: ChartOptions = { responsive: true };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  constructor() { }

  ngOnInit(): void {
    let barChartLabels: string[];
    let batChartData: ChartDataset[] = [];
    let cfdi: Ingreso | Egreso | Traslado;
    
    this.rawInputData.sort((a, b) => a._Fecha.getTime() - b._Fecha.getTime());
  }

  private setChartLabels(): string[]{
    let barChartLabels: string[] = [];

    if(this.rawInputData[0]._Fecha.getFullYear() === this.rawInputData[this.rawInputData.length - 1]._Fecha.getFullYear()){
      for(let i = this.rawInputData[0]._Fecha.getMonth(); i <= this.rawInputData[this.rawInputData.length - 1]._Fecha.getMonth(); i++){
        barChartLabels.push(this.getReadableMonth(i));
      }
    } else {
      for(let i = this.rawInputData[0]._Fecha.getFullYear(); i <= this.rawInputData[this.rawInputData.length - 1]._Fecha.getFullYear(); i++){
        barChartLabels.push(this.rawInputData[i]._Fecha.getFullYear().toString());
      }
    }

    return barChartLabels;
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
}
