import { AsvexportListComponent } from './containers/asvexport-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
const routes: Routes = [
  {
    path: '',
    component: AsvexportListComponent,
    data: {
      title: 'Asvexport Manager',
      name: 'Asvexport',
      roles: ['CtlAsvexport.mayInsert', 'CtlAsvexport.mayUpdate', 'CtlAsvexport.mayDelete']
    },
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsvexportRoutingModule { }
