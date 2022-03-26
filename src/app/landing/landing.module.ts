import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';

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
    CoreModule,
  ]
})
export class LandingModule { }
