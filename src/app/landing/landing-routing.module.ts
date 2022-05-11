import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing.page.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectToHome = () => redirectLoggedInTo(['/app'])

const routes: Routes = [
  {
    path : '',
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectToHome },
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
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
