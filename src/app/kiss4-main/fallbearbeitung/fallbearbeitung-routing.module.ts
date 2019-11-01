import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FallbearbeitungComponent } from './fallbearbeitung/fallbearbeitung.component';


const routes: Routes = [
  {
    path: '',
    component: FallbearbeitungComponent,
    children: [
      {
        path: 'B/Basis/:baPersonID',
        loadChildren: '../../kiss4-basis/basis.module#BasisModule',
      },
      {
        path: 'F/Fallfuhrung/:baPersonID',
        loadChildren: '../../kiss4-fallfuhrung/fallfuhrung-module.module#FallfuhrungModuleModule',
      },
      {
        path: 'S/Sozialhilfe/:baPersonID',
        loadChildren: '../../kiss4-sozialhilfe/sozialhilfe.module#SozialhilfeModule',
      },
      {
        path: 'I/Inkasso/:baPersonID',
        loadChildren: '../../kiss4-inkasso/inkasso.module#InkassoModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FallbearbeitungRoutingModule { }
