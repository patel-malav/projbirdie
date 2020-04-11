import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExploreComponent } from "./explore/explore.component";
import { AvesComponent } from './aves/aves.component';
import { ObservationComponent } from './observation/observation.component';
import { UserComponent } from './user/user.component';

const exploreRoutes: Routes = [
  {
    path: "explore",
    component: ExploreComponent,
    children: [
      {
        path: "aves/:term",
        pathMatch: "full",
        component: AvesComponent
      },
      {
        path: "observation/:id",
        pathMatch: "full",
        component: ObservationComponent
      },
      {
        path: "user/:name",
        pathMatch: "full",
        component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(exploreRoutes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule {}
