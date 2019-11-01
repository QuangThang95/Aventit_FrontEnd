import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { GemeindeCodeComponent } from './containers/gemeinde-code.component';

const routes: Routes = [
  {
    path: '',
    component: GemeindeCodeComponent,
    data: {
      title: 'Gemeinde Code Manager',
      name: 'Gemeinde Code'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GemeindeCodeRoutingModule { }
