import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { VorlagenverwaltungComponent } from './vorlagenverwaltung-from/vorlagenverwaltung.component';

const routes: Routes = [
  {
    path: '',
    component: VorlagenverwaltungComponent,
    data: {
      title: 'Vorlagenverwaltung',
      name: 'Vorlagenverwaltung'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VorlagenverwaltungRoutingModule {
}
