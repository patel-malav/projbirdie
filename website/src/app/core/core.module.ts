import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ProgressbarComponent } from './progressbar/progressbar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ProgressbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatProgressBarModule,
  ],
  exports: [HeaderComponent, FooterComponent, ProgressbarComponent],
})
export class CoreModule {}
