import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomePageComponent } from './home.page.component';
import { HomeToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    HomePageComponent, 
    HomeToolbarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
  ]
})
export class HomeModule { }
