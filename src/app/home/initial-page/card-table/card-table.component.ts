import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Egreso, Ingreso, Traslado } from 'src/app/service/cfdi';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {
  @ViewChild('dataTable') dataTable!: MatTable<any>;
  @Input() inputData: any[] = [];
  @Input() tableColumns: string[] = [];
  @Input() noContentLabel: string | undefined;
  @Input() noContentSubLabel: string | undefined;
  @Input() onNoContentReRoute: string | any[] | null | undefined;

  constructor() { }

  ngOnInit(): void { }

}
