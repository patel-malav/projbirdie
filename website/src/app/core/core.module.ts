import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SideComponent } from './side/side.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SideComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SideComponent
  ]
})
export class CoreModule { }
