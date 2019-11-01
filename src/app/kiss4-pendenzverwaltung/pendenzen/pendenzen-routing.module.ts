import { PendenzenVerwaltungComponent } from './pendenzen-verwaltung/pendenzen-verwaltung.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PendenzenVerwaltungComponent,
    data: {
      title: 'Pendenzen Verwaltungs Manager',
      name: 'pendenzen-verwaltung'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendenzenRoutingModule { }
