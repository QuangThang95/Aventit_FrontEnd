import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { WhLeistungComponent } from './whleistung-from/whleistung.component';

const routes: Routes = [
  {
    path: '',
    component: WhLeistungComponent,
    data: {
      title: 'WhLeistung',
      name: 'WhLeistung'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhLeistungRoutingModule { }
