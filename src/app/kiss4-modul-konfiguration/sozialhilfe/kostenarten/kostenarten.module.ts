import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KostenartenComponent } from './kostenarten/kostenarten.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { DxiMenuItemModule } from 'devextreme-angular/ui/nested/menu-item-dxi';


const components: any[] = [
    KostenartenComponent
];

const routes: Routes = [
    {
        path: '',
        component: KostenartenComponent,
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SimpleNotificationsModule,
        SharedComponentModule,
        LayoutContainersModule,
        DxiMenuItemModule,
        RouterModule.forChild(routes),
    ],
    declarations: [components],
})
export class KostenartenModule { }
