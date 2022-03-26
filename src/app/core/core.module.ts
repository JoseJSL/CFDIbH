import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FabFileButtonComponent } from './fab-file-button/fab-file-button.component';

@NgModule({
  declarations: [
    IconButtonComponent,
    FabFileButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    IconButtonComponent,
    FabFileButtonComponent,
  ]
})
export class CoreModule { }
