import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { LandingToolbarComponent } from './toolbar/toolbar.component';
import { UserRegisterStepperComponent } from './register/user-register-stepper/user-register-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EnterpriseRegisterStepperComponent } from './register/enterprise-register-stepper/enterprise-register-stepper.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    LandingPage,
    LoginComponent,
    RegisterComponent,
    LandingToolbarComponent,
    UserRegisterStepperComponent,
    EnterpriseRegisterStepperComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatRadioModule,
  ]
})
export class LandingModule { }
