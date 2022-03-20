import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing.page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path : '',
    children:[
      {
        path: '',
        component: LandingPage
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
