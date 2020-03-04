import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobeComponent } from './globe/globe.component';


@NgModule({
  declarations: [GlobeComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    GlobeComponent
  ]
})
export class ExploreModule { }
