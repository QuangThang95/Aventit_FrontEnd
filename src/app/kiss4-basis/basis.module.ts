import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasisComponent } from './basis.component';

const components: any[] = [
  BasisComponent
];

const routes: Routes = [
  {
    path: '',
    component: BasisComponent,
    children: [
      {
        path: 'BaPerson/:baPersonID',
        loadChildren: './baperson-module/baperson-module.module#BaPersonModuleModule',
      },
      {
        path: '',
        loadChildren: './../kiss4-basis/klientensystem/klientensystem.module#KlientensystemModule',
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [components],
})
export class BasisModule { }
