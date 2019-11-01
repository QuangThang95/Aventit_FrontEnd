import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

import { TreeListComponent } from './containers/tree-list.component';

const routes: Routes = [
  {
    path: '',
    component: TreeListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  export class FallNavigatorRoutingModule { }