import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing.page.component';
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
