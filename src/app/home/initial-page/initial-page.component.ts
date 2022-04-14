import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  public gridCols: number = window.innerWidth <= 768 ? window.innerWidth <= 576 ? 1 : 2 : 3;
  public xmlsData: any[] = [
    {Concepto: 'Uno', Cantidad: '$1000.00'},
    {Concepto: 'Dos', Cantidad: '$2000.00'},
    {Concepto: 'Tres', Cantidad: '$3000.00'},
  ];
  public xmlsCols: string[] = ['Concepto', 'Cantidad'];
  constructor() { }

  ngOnInit(): void {}

  handleResize(event: any){
    try{
      this.gridCols = event.target.innerWidth <= 768 ? event.target.innerWidth <= 576 ? 1 : 2 : 3;
    } catch(e){ }
  }

}
