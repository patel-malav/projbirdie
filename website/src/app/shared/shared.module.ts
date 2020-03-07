import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';



@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DataService
      ]
    }
  }
}
