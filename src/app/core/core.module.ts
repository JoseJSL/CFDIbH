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
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconInputComponent } from './icon-input/icon-input.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    IconButtonComponent,
    FabFileButtonComponent,
    DialogComponent,
    CfdiTableComponent,
    IconInputComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    IconButtonComponent,
    FabFileButtonComponent,
    CfdiTableComponent,
    IconInputComponent,
    ProgressSpinnerComponent,
  ]
})
export class CoreModule { }
