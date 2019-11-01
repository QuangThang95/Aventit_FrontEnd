import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { TextmarkenComponent } from './containers/basis-textmarken.component';

const routes: Routes = [
  {
    path: '',
    component: TextmarkenComponent,
    data: {
      title: 'Textmarken',
      name: 'Textmarken'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  { path: '**', redirectTo: '/exception/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextmarkenRoutingModule { }
