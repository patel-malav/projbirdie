import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreRoutingModule } from "./explore-routing.module";
import { ExploreComponent } from "./explore/explore.component";
import { SearchComponent } from "./search/search.component";
import { AvesComponent } from "./aves/aves.component";
import { ObservationComponent } from "./observation/observation.component";
import { UserComponent } from "./user/user.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { AngularResizedEventModule } from 'angular-resize-event';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExploreComponent,
    SearchComponent,
    AvesComponent,
    ObservationComponent,
    UserComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularResizedEventModule,
    FormsModule
  ],
  exports: []
})
export class ExploreModule {}
