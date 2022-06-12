import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogComponentData } from 'src/app/core/dialog/dialog.component';
import { CFDI, ReadableCFDI } from 'src/app/model/cfdi3.3';
@Component({
  selector: 'table-xml-details',
  templateUrl: './xml-details.component.html',
  styleUrls: ['./xml-details.component.scss']
})
export class XmlDetailsComponent implements OnInit {
  @Input() XmlData!: CFDI;
  @Output() confirmDelete = new EventEmitter<string>();
  public Data!: ReadableCFDI;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.Data = new ReadableCFDI(this.XmlData);
  }

  openDeleteDialog(){
    const data: DialogComponentData = {
      title: 'Eliminar doumento',
      content: '¿Está seguro que desea eliminar éste documento de ' + this.Data.TipoComprobante.toLowerCase() + '?',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
      acceptColor: 'warn',
    }
    this.matDialog.open(DialogComponent, {data: data}).afterClosed().subscribe(accepted => {
      if(accepted){
        this.confirmDelete.emit(this.XmlData._NoCertificado);
      }
    })
  }
}
