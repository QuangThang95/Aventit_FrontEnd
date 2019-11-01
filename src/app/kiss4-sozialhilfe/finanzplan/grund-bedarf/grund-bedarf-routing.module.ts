import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { CtlBfsGrundbedarfComponent } from './containers/ctl-bfs-grundbedarf/ctl-bfs-grundbedarf.component';


const routes: Routes = [
  {
    path: '',
    component: CtlBfsGrundbedarfComponent,
    data: {
      title: 'GrundBedarf Manager',
      name: 'GrundBedarf',
      roles: ['CtlGrundBedarf.mayInsert', 'CtlGrundBedarf.mayUpdate', 'CtlGrundBedarf.mayDelete']
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrundBedarfRoutingModule { }
