import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';
import { ArbeitComponent } from './containers/arbeit.component';
const routes: Routes = [
  {
    path: '',
    component: ArbeitComponent,
    data: {
      title: 'Arbeitt Detail',
      name: 'Arbeitt',
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArbeitRoutingModule { }
