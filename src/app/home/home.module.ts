import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './home.page.component';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SwiperModule } from 'swiper/angular';
import { NgChartsModule } from 'ng2-charts';
import { CardChartsComponent } from './initial-page/card-charts/card-charts.component';
import { XmlDetailsComponent } from './initial-page/card-table/xml-details/xml-details.component';
import { CurrentAssociatesComponent } from './associates/current-associates/current-associates.component';
import { EditAccountantComponent } from './associates/current-associates/edit-accountant/edit-accountant.component';
import { EditEnterpriseComponent } from './associates/current-associates/edit-enterprise/edit-enterprise.component';
import { CardResumeComponent } from './initial-page/card-resume/card-resume.component';

@NgModule({
  declarations: [
    HomePageComponent, 
    ProfileComponent, 
    AssociatesComponent,
    InitialPageComponent,
    CardTableComponent,
    FiltersComponent,
    CardChartsComponent,
    XmlDetailsComponent,
    CurrentAssociatesComponent,
    EditAccountantComponent,
    EditEnterpriseComponent,
    CardResumeComponent,
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
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    SwiperModule,
    NgChartsModule,
  ],
})
export class HomeModule { }
