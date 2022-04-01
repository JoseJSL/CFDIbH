import { Component, OnInit, ViewChild } from '@angular/core';
import { CfdiTableComponent } from '../core/cfdi-table/cfdi-table.component';
import { Egreso, Ingreso, Traslado } from '../service/cfdi';

@Component({
  selector: 'app-landing.page',
  templateUrl: './landing.page.component.html',
  styleUrls: ['./landing.page.component.scss']
})
export class LandingPage implements OnInit {
  @ViewChild('documentTable') documentTable!: CfdiTableComponent;

  constructor() { }

  ngOnInit(): void { }

  updateDocuments(ev: (Ingreso | Egreso | Traslado)[]){
    this.documentTable.addDocuments(ev);
  }
}
