import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { VorlagenProfileComponent } from './vorlagenProfile-from/vorlagenProfile.component';

const routes: Routes = [
  {
    path: '',
    component: VorlagenProfileComponent,
    data: {
      title: 'VorlagenProfile',
      name: 'VorlagenProfile'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VorlagenProfileRoutingModule { }
