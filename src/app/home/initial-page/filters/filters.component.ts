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
  public Tipos: string[] = []
  public FormasPago: string[] = [];
  public MetodosPago: string[] = [];

  constructor() {}

  handleResize(event: any){
    try{
      this.filterCols = event.target.innerWidth <= 768 ? event.target.innerWidth <= 576 ? 2 : 3 : 4;
      this.useDateDialog = event.target.innerWidth <= 576;
    } catch(e){}
  }

  ngOnInit(): void {
    this.updatePosibleIndexes();
  }

  updatePosibleIndexes(data?: (Ingreso | Egreso | Traslado)[]){
    if(data){
      this.inputData = data;
    }

    for(let i = 0; i < this.inputData.length; i++){
      if(this.Receptores.lastIndexOf(this.inputData[i].Receptor._Nombre) === -1){
        this.Receptores.push(this.inputData[i].Receptor._Nombre);
      }

      if(this.Emisores.lastIndexOf(this.inputData[i].Emisor._Nombre) === -1){
        this.Emisores.push(this.inputData[i].Emisor._Nombre);
      }

      if(this.Tipos.lastIndexOf(this.inputData[i]._TipoDeComprobante) === -1){
        this.Tipos.push(this.inputData[i]._TipoDeComprobante);
      }

      if(this.inputData[i]._MetodoPago){
        if(this.MetodosPago.lastIndexOf(this.inputData[i]._MetodoPago!) === -1){
          this.MetodosPago.push(this.inputData[i]._MetodoPago!);
        }
      }
      
      if(this.inputData[i]._FormaPago){
        if(this.FormasPago.lastIndexOf(this.inputData[i]._FormaPago!) == -1){
          this.FormasPago.push(this.inputData[i]._FormaPago!);
        }
      }
    }
  }

  changeFilter(data: any, filter: 'receptor' | 'emisor' | 'tipo' | 'formaPago' | 'metodoPago'){
    if(data !== this.Filters[filter]){
      if(data.length > 0){
        this.Filters[filter] = data;
      } else {
        this.Filters[filter] = undefined;
      }

      this.filtersChanged.emit(this.Filters);
    }
  }

  changeDate(monthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>, filter: 'desdeFecha' | 'hastaFecha'){
    datepicker.close();

    const date = monthAndYear.toDate();
    if(date !== this.Filters[filter]){
      this.Filters[filter] = date
      datepicker.select(monthAndYear);
      this.filtersChanged.emit(this.Filters);
    }
  }

  removeDate(datePickerInput: HTMLInputElement, filter: 'desdeFecha' | 'hastaFecha'){
    if(this.Filters[filter]){
      datePickerInput.value = '';
      this.Filters[filter] = undefined;
      this.filtersChanged.emit(this.Filters);
    }
  }

  readableTipoComprobante(tipo: string): string{
    switch(tipo){
      case('I'): return 'Ingreso';
      case('E'): return 'Egreso';
      case('T'): return 'Traslado';
      case('N'): return 'Nomina';
      default: return 'Pago';
    }
  }

  readableFormaPago(formaPago: string): string{
    switch(formaPago){
      case('01'): return 'Efectivo';
      case('02'): return 'Cheque nominativo';
      case('03'): return 'Transferencia electrónica de fondos';
      case('04'): return 'Tarjeta de crédito';
      default: return 'Por definir';
    }
  }

  readableMetodoPago(metodoPago: string): string{
    switch(metodoPago){
      case('PUE'): return 'Una sola exhibicion';
      default: return 'En parcialidades o diferido';
    }

  }
}
