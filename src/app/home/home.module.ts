import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './home.page.component';
import { HomeToolbarComponent } from './toolbar/toolbar.component';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { XmlsPageComponent } from './xmls-page/xmls-page.component';
import { AssociatesComponent } from './associates/associates.component';


@NgModule({
  declarations: [
    HomePageComponent, 
    HomeToolbarComponent, ProfileComponent, XmlsPageComponent, AssociatesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class HomeModule { }
