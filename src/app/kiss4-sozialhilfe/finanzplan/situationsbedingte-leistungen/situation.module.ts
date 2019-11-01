import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SituationComponent } from './situation.component';

const routes: Routes = [
  {
    path: '',
    component: SituationComponent,
    children: [
      {
        path: 'AHVBeitrag',
        loadChildren: './ahv-beitrage/ahv-beitrage.module#AhvBeitrageModule',
      },
      {
        path: 'BgSilWiedereingliederung',
        loadChildren: './ahv-beitrage/ahv-beitrage.module#AhvBeitrageModule',
      },
      {
        path: 'BgSilTherapieEntzug',
        loadChildren: './ahv-beitrage/ahv-beitrage.module#AhvBeitrageModule',
      },
      {
        path: 'BgSilKrankheitBehinderungLeistung',
        loadChildren: './ahv-beitrage/ahv-beitrage.module#AhvBeitrageModule',
      },
      {
        path: 'BgSilSituationsbedingteLeistungen',
        loadChildren: './ahv-beitrage/ahv-beitrage.module#AhvBeitrageModule',
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SituationComponent],
})
export class SituationModule { }
