import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './home.page.component';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { XmlsPageComponent } from './xmls-page/xmls-page.component';
import { AssociatesComponent } from './associates/associates.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CardTableComponent } from './initial-page/card-table/card-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LandingModule } from '../landing/landing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersComponent } from './initial-page/filters/filters.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    HomePageComponent, 
    ProfileComponent, 
    XmlsPageComponent, 
    AssociatesComponent,
    InitialPageComponent,
    CardTableComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule,
    MatIconModule,
    LandingModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    MatPaginatorModule,
  ]
})
export class HomeModule { }
