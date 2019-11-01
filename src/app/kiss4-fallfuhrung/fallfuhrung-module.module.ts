import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FallfuhrungModuleComponent } from './fallfuhrung-module.component';

const routes: Routes = [
  {
    path: '',
    component: FallfuhrungModuleComponent,
    children: [
      {
        path: '',
        loadChildren: './fallfuhrung/fallfuhrung.module#FallfuhrungModule',
      },
      {
        path: ':faLeistungID',
        loadChildren: './fallfuhrung/fallfuhrung.module#FallfuhrungModule',
      },
      {
        path: ':faLeistungID/Beratungsphase/:faPhaseID',
        loadChildren: './beratungsphase/beratungsphase.module#BeratungsphaseModule',
      },
      {
        path: ':faLeistungID/Dokumentation/Besprechung',
        loadChildren: './fa-aktennotiz/fa-aktennotiz.module#FaAktennotizModule',
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [FallfuhrungModuleComponent],
})
export class FallfuhrungModuleModule { }
