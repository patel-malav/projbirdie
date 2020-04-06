import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { MediaComponent } from './media/media.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MediaComponent],
  providers: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [MediaComponent]
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
