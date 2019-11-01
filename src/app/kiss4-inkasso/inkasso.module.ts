import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { ModuleConfigModule } from '@shared/layouts/left-sidebars/module-config/module-config.module';

import { InkassoComponent } from './inkasso.component';


const components: any[] = [
    InkassoComponent
];

const routes: Routes = [
    {
        path: '',
        component: InkassoComponent,
        children: [
            { path: '', redirectTo: 'inkassofall', pathMatch: 'full' },
            {
                path: 'inkassofall',
                loadChildren: './inkassofall/inkassofall.module#InkassofallModule',
            },
        ],
        canDeactivate: [CanDeactivateGuard]
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
export class InkassoModule {
}
