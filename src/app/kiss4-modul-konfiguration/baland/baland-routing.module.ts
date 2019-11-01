import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalandComponent } from '@app/kiss4-modul-konfiguration/baland/containers/baland.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: BalandComponent,
    data: {
      title: 'Baland Manager',
      name: 'Baland'
      // roles: ['CtlBaland.mayInsert', 'CtlBaland.mayUpdate', 'CtlBaland.mayDelete']
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalandRoutingModule { }
