import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { VariablenComponent } from './containers/bfs-variablen.component';

const routes: Routes = [
  {
    path: '',
    component: VariablenComponent,
    data: {
      title: 'Variablen Manager',
      name: 'Variablen'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariablenRoutingModule { }
