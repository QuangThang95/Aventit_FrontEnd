import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { GemeindeDatenComponent } from './containers/gemeinde-daten.component';

const routes: Routes = [
  {
    path: '',
    component: GemeindeDatenComponent,
    data: {
      title: 'Gemeinde Daten Manager',
      name: 'Gemeinde Daten'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GemeindeDatenRoutingModule { }
