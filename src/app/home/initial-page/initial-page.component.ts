import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  public xmlsData: any[] = [];
  public selectedPerson: string | undefined;
  public xmlsCols: string[] = ['Concepto', 'Cantidad'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedPerson = params['rfc'] ? params['rfc'] : 'current';

      if(this.selectedPerson == 'current'){
        this.xmlsData = [
          {Concepto: 'Uno', Cantidad: '$1000.00'},
          {Concepto: 'Dos', Cantidad: '$2000.00'},
          {Concepto: 'Tres', Cantidad: '$3000.00'},
        ];
      } else {
        this.xmlsData = [
          {Concepto: 'Cuatro', Cantidad: '$4000.00'},
          {Concepto: 'Cinco', Cantidad: '$5000.00'},
          {Concepto: 'Seis', Cantidad: '$6000.00'},
        ];
      }
    });
  }

}
