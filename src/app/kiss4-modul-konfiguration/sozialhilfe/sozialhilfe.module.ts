import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { SozialhilfeComponent } from './sozialhilfe.component';

const components: any[] = [
    SozialhilfeComponent
];

const routes: Routes = [
    {
        path: '',
        component: SozialhilfeComponent,
        children: [
            {
                path: '',
                loadChildren: './kostenarten/kostenarten.module#KostenartenModule',
            },
            {
                path: 'kostenarten',
                loadChildren: './kostenarten/kostenarten.module#KostenartenModule',
            }
        ],
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [components],
})
export class SozialhilfeModule { }
