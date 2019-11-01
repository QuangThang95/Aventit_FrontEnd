import { FaAktennotizComponent } from './fa-aktennotiz-from/fa-aktennotiz.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: FaAktennotizComponent,
    data: {
      title: 'FaAktennotiz',
      name: 'FaAktennotiz'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaAktennotizRoutingModule { }
