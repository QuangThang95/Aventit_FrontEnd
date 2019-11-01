import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { ModuleConfigModule } from '@shared/layouts/left-sidebars/module-config/module-config.module';

import { ModulKonfigurationComponent } from './modul-konfiguration.component';

const components: any[] = [
    ModulKonfigurationComponent
];

const routes: Routes = [
    {
        path: '',
        component: ModulKonfigurationComponent,
        children: [
            { path: '', redirectTo: 'sozialhilfe/kostenarten', pathMatch: 'full' },
            {
                path: 'sozialhilfe/kostenarten',
                loadChildren: './sozialhilfe/sozialhilfe.module#SozialhilfeModule',
            },
            {
                path: 'stammdaten/gemeinde-aktualisieren',
                loadChildren: './gemeinde-daten/gemeinde-daten.module#GemeindeDatenModule',
            },
            {
                path: 'stammdaten/lander-aktualisieren',
                loadChildren: './baland/baland.module#BalandModule',
            },
            {
                path: 'stammdaten/postleitzahlen-aktualisieren',
                loadChildren: './postleitzahlen-aktualisieren/postleitzahlen-aktualisieren.module#PostleitzahlenAktualisierenModule',
            }
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
    declarations: [components],
})
export class ModulKonfiguration { }
