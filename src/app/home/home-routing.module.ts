import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home.page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children:[
      {
        path: 'profile',
      },
      {
        path: 'xmls',
        children:[
          {
            path: ':cfdi', //Ver un solo CFDI ampliado
          },
        ],
      },
      {
        path: 'associates',
        children: [
          {
            path: ':rfc',
            children: [
              {
                path: 'xmls',
                children: [
                  {
                    path: ':cfdi',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
