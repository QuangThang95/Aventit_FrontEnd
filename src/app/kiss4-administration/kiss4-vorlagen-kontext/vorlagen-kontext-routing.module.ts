import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { VorlagenKontextComponent } from './container/vorlagen-kontext.component';

const routes: Routes = [
  {
    path: '',
    component: VorlagenKontextComponent,
    data: {
      title: 'VorlagenKontext',
      name: 'VorlagenKontext'
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VorlagenKontextRoutingModule {
}
