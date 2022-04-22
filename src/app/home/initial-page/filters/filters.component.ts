import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';
import { CFDIFilter } from './filter';

@Component({
  selector: 'table-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<CFDIFilter>();
  @Input() inputData!: (Ingreso | Egreso | Traslado)[];
  public Filters: CFDIFilter = {};
  public filterCols: number = 4;

  constructor() { }

  ngOnInit(): void {
  }

  changeFilter(data: any, filter: 'receptor' | 'emisor'){
    this.Filters[filter] = data;
    this.filtersChanged.emit(this.Filters);
  }

}
