import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { ModuleConfigModule } from '@shared/layouts/left-sidebars/module-config/module-config.module';

import { SostatComponent } from './sostat.component';

const components: any[] = [
  SostatComponent
];

const routes: Routes = [
  {
    path: '',
    component: SostatComponent,
    children: [
      { path: '', redirectTo: 'dossiers', pathMatch: 'full' },
      {
        path: 'dossiers',
        loadChildren: './dossiers/dossiers.module#DossiersModule'
      },
      {
        path: 'abfragen/bfs-variablen',
        loadChildren: './bfs-variablen/bfs-variablen.module#VariablenModule',
        data: {
          title: 'Variablen Manager',
          name: 'Variablen'
        }
      }, {
        path: 'stammdaten/konfiguration',
        loadChildren: './konfiguration/konfiguration.module#KonfigurationModule'
      },
      {
        path: 'abfragen/gemeinde-code',
        loadChildren: './gemeinde-code/gemeinde-code.module#GemeindeCodeModule'
      },
      {
        path: 'stammdaten/fragenkatalog',
        loadChildren: './ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.module#CtlBfsFragenkatalogModule',
        data: {
          title: 'CtlBfsFragenkatalog',
          name: 'CtlBfsFragenkatalog'
        }
      },
      {
        path: 'abfragen/kennzahlen',
        pathMatch: 'full',
        loadChildren: './kennzahlen/kennzahlen.module#KennzahlenModule',
        data: {
          title: 'Kennzahlen',
          name: 'Kennzahlen'
        }
      },
      {
        path: 'abfragen/plausifehler',
        pathMatch: 'full',
        loadChildren: './plausifehler/plausifehler.module#PlausifehlerModule',
        data: {
          title: 'Plausifehler',
          name: 'Plausifehler'
        }
      },
      {
        path: 'hilfe/dokumente',
        loadChildren: './ctl-bfs-dokumente/ctl-bfs-dokumente.module#CtlBfsDokumenteModule',
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    LayoutContainersModule,
    RouterModule.forChild(routes),
    ModuleConfigModule
  ],
  declarations: [components]
})
export class SostatModule {
}
