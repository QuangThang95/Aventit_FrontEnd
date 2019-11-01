import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhFinanzplanComponent } from './wh-finanzplan.component';

const routes: Routes = [
  {
    path: '',
    component: WhFinanzplanComponent,
    children: [
      {
        path: 'BgUebersicht',
        loadChildren: './bg-uebersicht/bg-uebersicht.module#BgUebersichtModule',
      },
      {
        path: 'BgGrundbedarf',
        loadChildren: './grund-bedarf/grund-bedarf.module#GrundBedarfModule',
      },
      {
        path: 'BgVermoegen',
        loadChildren: './vermogen/vermogen.module#VermogenModule',
      },
      {
        path: 'BgZulagenEFB',
        loadChildren: './zulagen-efb/zulagen-efb.module#ZulagenEfbModule',
      },
      {
        path: 'Situation',
        loadChildren: './situationsbedingte-leistungen/situation.module#SituationModule',
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WhFinanzplanComponent],
})
export class WhFinanzplanModule { }
