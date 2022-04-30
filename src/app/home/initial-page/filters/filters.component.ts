import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';
import { CFDIFilter } from './filter';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'table-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
})
export class FiltersComponent implements OnInit {
  @ViewChild('datePicker') datePicker!: MatDatepicker<Date>;

  @Output() filtersChanged = new EventEmitter<CFDIFilter>();

  @Input() inputData!: (Ingreso | Egreso | Traslado)[];
  public filterCols: number = window.innerWidth <= 768 ? window.innerWidth <= 576 ? 2 : 3 : 4;
  public useDateDialog: boolean = window.innerWidth <= 576;
  public Filters: CFDIFilter = {};
  public Receptores: string[] = [];
  public Emisores: string[] = [];

  constructor() {}

  handleResize(event: any){
    try{
      this.filterCols = event.target.innerWidth <= 768 ? event.target.innerWidth <= 576 ? 2 : 3 : 4;
      this.useDateDialog = event.target.innerWidth <= 576;
    } catch(e){}
  }

  ngOnInit(): void {
    for(let i = 0; i < this.inputData.length; i++){
      if(this.Receptores.lastIndexOf(this.inputData[i].Receptor._Nombre) == -1){
        this.Receptores.push(this.inputData[i].Receptor._Nombre);
      }
    }

    for(let i = 0; i < this.inputData.length; i++){
      if(this.Emisores.lastIndexOf(this.inputData[i].Emisor._Nombre) == -1){
        this.Emisores.push(this.inputData[i].Emisor._Nombre);
      }
    }
  }

  changeFilter(data: any, filter: 'receptor' | 'emisor'){
    this.Filters[filter] = data;
    this.filtersChanged.emit(this.Filters);
  }

  changeDate(monthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>, filter: 'desdeFecha' | 'hastaFecha'){
    datepicker.close();
    this.Filters[filter] = monthAndYear.toDate();
    datepicker.select(monthAndYear);
    this.filtersChanged.emit(this.Filters);
  }

}
