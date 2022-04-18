import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociatesComponent } from './associates/associates.component';
import { HomePageComponent } from './home.page.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ProfileComponent } from './profile/profile.component';
import { XmlsPageComponent } from './xmls-page/xmls-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectoToLanding = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectoToLanding },
    children:[
      {
        path: '',
        component: InitialPageComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'xmls', //Qué podrá hacer aquí?
        component: XmlsPageComponent,
        children:[
          {
            path: ':cfdi', //Ver un solo CFDI ampliado
          },
        ],
      },
      {
        path: 'associates',
        component: AssociatesComponent,
      },
      {
        path: 'associates/:rfc', //Ver un solo 'socio'
        component: InitialPageComponent,
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
export class HomeRoutingModule { }
