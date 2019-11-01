import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BeraterComponent} from './containers/berater/berater.component';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: BeraterComponent,
    data: {
      title: 'Berater',
      name: 'berater'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeraterRoutingModule {
}
