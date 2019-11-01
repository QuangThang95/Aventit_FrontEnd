import { UberComponent } from './containers/uber.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: UberComponent,
    data: {
      title: 'Uber Manager',
      name: 'Uber',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UberRoutingModule { }
