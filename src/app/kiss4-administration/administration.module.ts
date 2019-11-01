import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { ModuleConfigModule } from '@shared/layouts/left-sidebars/module-config/module-config.module';

import { AdministrationComponent } from './administration.component';


const components: any[] = [
    AdministrationComponent
];

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        children: [
            { path: '', redirectTo: 'vorlagen/vorlagen', pathMatch: 'full' },
            {
                path: 'vorlagen/vorlagen',
                loadChildren: './vorlagenverwaltung/vorlagenverwaltung.module#VorlagenverwaltungModule',
            },
            {
                path: 'vorlagen/kontext',
                loadChildren: './kiss4-vorlagen-kontext/vorlagen-kontext.module#VorlagenKontextModule',
            },
            {
                path: 'vorlagen/vorlagen-profile',
                loadChildren: './vorlagen-profile/vorlagenProfile.module#VorlagenProfileModule',
            },
            {
                path: 'textmarken/basis-textmarken',
                loadChildren: './basis-textmarken/basis-textmarken.module#BasistextmarkenModule',
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
    declarations: [components]
})

export class AdministrationModule {
}
