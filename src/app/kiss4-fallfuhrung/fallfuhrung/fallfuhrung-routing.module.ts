import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FallfuhrungComponent } from './containers/fallfuhrung.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: FallfuhrungComponent,
    data: {
      title: 'Fallfuhrung Manager',
      name: 'Fallfuhrung',
      roles: ['CtlFallfuhrung.mayInsert', 'CtlFallfuhrung.mayUpdate', 'CtlFallfuhrung.mayDelete']
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FallfuhrungRoutingModule { }
