import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LandingPage,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class LandingModule { }
