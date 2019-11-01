import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeratungsphaseListComponent } from './containers/beratungsphase-list.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: BeratungsphaseListComponent,
    data: {
      title: 'Beratungsphase Manager',
      name: 'Beratungsphase',
      roles: ['CtlBeratungsphase.mayInsert', 'CtlBeratungsphase.mayUpdate', 'CtlBeratungsphase.mayDelete']
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeratungsphaseRoutingModule { }
