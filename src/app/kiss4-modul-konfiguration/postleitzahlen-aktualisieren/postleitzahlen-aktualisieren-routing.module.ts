import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import {
  PostleitzahlenAktualisierenListComponent,
} from './postleitzahlen-aktualisieren-list/postleitzahlen-aktualisieren-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostleitzahlenAktualisierenListComponent,
    data: {
      title: 'Postleitzahlen Aktualisieren Manager',
      name: 'Postleitzahlen Aktualisieren'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostleitzahlenAktualisierenRoutingModule { }
