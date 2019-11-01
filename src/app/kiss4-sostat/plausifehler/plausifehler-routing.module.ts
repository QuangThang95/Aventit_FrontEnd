import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlausifehlerComponent } from '@app/kiss4-sostat/plausifehler/pages/plausifehler.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PlausifehlerComponent,
    data: {
      title: 'Plausifehler Manager',
      name: 'Plausifehler'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlausifehlerRoutingModule { }
