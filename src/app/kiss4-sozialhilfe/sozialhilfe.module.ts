import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SozialhilfeComponent } from './sozialhilfe.component';

const routes: Routes = [
  {
    path: '',
    component: SozialhilfeComponent,
    children: [
      {
        path: '',
        loadChildren: './whleistung/whleistung.module#WhLeistungModule',
      },
      {
        path: ':bgFinanzplanID',
        loadChildren: './personen-im-haushalt/personen-im-haushalt.module#PersonenImHaushaltModule',
      },
      {
        path: 'WhFinanzplan/:bgFinanzplanID',
        loadChildren: './finanzplan/wh-finanzplan.module#WhFinanzplanModule',
      },
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SozialhilfeComponent],
})
export class SozialhilfeModule { }
