import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogComponentData{
  title?: string,
  content: string,
  cancelText?: string,
  acceptText?: string,
  acceptColor?: 'primary' | 'warn',
  cancelColor?: 'primary' | 'warn',
}

@Component({
  selector: 'cancel-ok-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogComponentData) {
    this.data.acceptText ?? "Aceptar";
  }
}
