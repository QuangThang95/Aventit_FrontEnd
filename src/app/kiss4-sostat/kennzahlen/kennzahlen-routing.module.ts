import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { KennzahlenComponent } from './pages/kennzahlen/kennzahlen.component';

const routes: Routes = [
  {
    path: '',
    component: KennzahlenComponent,
    data: {
      title: 'Kennzahlen Manager',
      name: 'Kennzahlen'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KennzahlenRoutingModule { }
