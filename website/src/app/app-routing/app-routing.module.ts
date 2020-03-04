import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../core/dashboard/dashboard.component';
import { GlobeComponent } from '../explore/globe/globe.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'explore',
    component: GlobeComponent
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
