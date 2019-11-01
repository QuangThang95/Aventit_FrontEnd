import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { CtlBfsDokumenteComponent } from './containers/ctl-bfs-dokumente.component';

const routes: Routes = [
  {
    path: '',
    component: CtlBfsDokumenteComponent,
    data: {
      title: 'CtlBfsDokumente Manager',
      name: 'CtlBfsDokumente',
      roles: ['CtlCtlBfsDokumente.mayInsert', 'CtlCtlBfsDokumente.mayUpdate', 'CtlCtlBfsDokumente.mayDelete']
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtlBfsDokumenteRoutingModule { }
