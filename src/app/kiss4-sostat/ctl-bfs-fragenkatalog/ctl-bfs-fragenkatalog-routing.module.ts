import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';
import {CtlBfsFragenkatalogComponent} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/pages/ctl-bfs-fragenkatalog.component';


const routes: Routes = [
  {
    path: '',
    component: CtlBfsFragenkatalogComponent,
    data: {
      title: 'CtlBfsFragenkatalog',
      name: 'CtlBfsFragenkatalog'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtlBfsFragenkatalogRoutingModule { }
