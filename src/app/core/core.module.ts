import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FabFileButtonComponent } from './fab-file-button/fab-file-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { CfdiTableComponent } from './cfdi-table/cfdi-table.component';

@NgModule({
  declarations: [
    IconButtonComponent,
    FabFileButtonComponent,
    DialogComponent,
    CfdiTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
  ],
  exports: [
    IconButtonComponent,
    FabFileButtonComponent,
  ]
})
export class CoreModule { }
