import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CanDeactivateGuard } from '@shared/guards/canDeactivate.guard';

import { InkassofallComponent } from './containers/inkassofall.component';


const routes: Routes = [
    {
        path: '',
        component: InkassofallComponent,
        data: {
            title: 'Inkassofall',
            name: 'Inkassofall'
        },
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InkassofallRoutingModule { }
