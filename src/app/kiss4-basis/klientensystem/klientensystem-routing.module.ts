import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { KlientensystemComponent } from './klientensystem-from/klientensystem.component';

const routes: Routes = [
  {
    path: '',
    component: KlientensystemComponent,
    data: {
      title: 'Klientensystem',
      name: 'Klientensystem'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KlientensystemRoutingModule { }
