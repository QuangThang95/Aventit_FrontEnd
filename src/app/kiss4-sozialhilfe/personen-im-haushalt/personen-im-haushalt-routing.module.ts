import {PersonenImHaushaltComponent} from '@app/kiss4-sozialhilfe/personen-im-haushalt/containers/personen-im-haushalt.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PersonenImHaushaltComponent,
    data: {
      title: 'personen-im-haushalt',
      name: 'personen-im-haushalt'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonenImHaushaltRoutingModule { }
