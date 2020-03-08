import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SideComponent } from './side/side.component';

import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SideComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SideComponent,
    DashboardComponent
  ]
})
export class CoreModule { }
