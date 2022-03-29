import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogComponentData{
  title?: string,
  content: string,
  cancelText?: string,
  acceptText?: string,
}

@Component({
  selector: 'cancel-ok-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogComponentData, private dialog: MatDialog, private dialogRef: MatDialogRef<DialogComponent>) {
    this.data.acceptText ?? "Aceptar";
  }
}
