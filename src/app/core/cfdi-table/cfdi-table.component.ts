import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cfdi-table',
  templateUrl: './cfdi-table.component.html',
  styleUrls: ['./cfdi-table.component.scss']
})
export class CfdiTableComponent implements OnInit {
  data = [];
  constructor() { }

  ngOnInit(): void {
  }

}
