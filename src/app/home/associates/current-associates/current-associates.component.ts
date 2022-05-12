import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogComponentData } from 'src/app/core/dialog/dialog.component';
import { Client } from 'src/app/service/user';
import { UserModuleService } from 'src/app/service/user-module.service';

@Component({
  selector: 'current-associates',
  templateUrl: './current-associates.component.html',
  styleUrls: ['./current-associates.component.scss']
})
export class CurrentAssociatesComponent implements OnInit {
  public currentUserAssociates: Client[] = [];
  
  constructor(private userModule: UserModuleService, private matDialog: MatDialog) { }

  async ngOnInit() {
    const uid = await this.userModule.getCurrentUserUID();
    if(uid){
      this.currentUserAssociates = await this.userModule.getUserClients(uid);
    }
  }

  
  openDeleteDialog(client: Client){
    const data: DialogComponentData = {
      title: `¿Eliminar ${client.DisplayName} de asociados?`,
      content: 'No se eliminarán los documentos de éste, pero ya no podrá ver ni modificar sus documentos.',
      acceptText: 'Eliminar',
      cancelText: 'Cancelar',
      acceptColor: 'warn',
    }
    this.matDialog.open(DialogComponent, {data: data}).afterClosed().subscribe(accepted => {
      if(accepted){
        console.log('Se muere: ' + client.DisplayName );
      }
    })
  }
}
