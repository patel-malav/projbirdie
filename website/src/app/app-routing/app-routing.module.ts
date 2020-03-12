import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../core/dashboard/dashboard.component';
import { EngineComponent } from '../explore/engine/engine.component';
// import { CanvasComponent } from '../explore/canvas/canvas.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: DashboardComponent
  // },
  {
    path: '',
    component: EngineComponent
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
