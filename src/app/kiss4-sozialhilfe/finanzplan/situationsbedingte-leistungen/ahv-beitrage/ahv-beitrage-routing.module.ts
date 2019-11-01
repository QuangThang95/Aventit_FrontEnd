import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AhvBeitrageComponent } from './containers/ctl-ahv-beitrage/ahv-beitrag.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: AhvBeitrageComponent,
    data: {
      title: 'Ahv Beitrage',
      name: 'Ahv Beitrage'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AhvBeitrageRoutingModule { }

