import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemographieComponent } from './demographie-form/demographie.component';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
    {
      path: '',
      component: DemographieComponent,
      data: {
        title: 'demographie',
        name: 'demographie'
      },
      canDeactivate: [CanDeactivateGuard]
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DemographieRoutingModule { }
