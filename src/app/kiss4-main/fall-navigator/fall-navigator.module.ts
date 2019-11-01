import { AppEnums } from '@shared/AppEnum';
import { StoreModule } from '@ngrx/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { FallNavsEffects } from '@app/kiss4-main/fall-navigator/store/effects/fall-navigator.effects';
import { reducers } from '@app/kiss4-main/fall-navigator/store';

// register modules devextreme angular ui
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';

import { FallNavigatorRoutingModule } from './fall-navigator-rouring.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { TreeListComponent } from './containers/tree-list.component';
// providers
import { FallNavsSandbox } from '@app/kiss4-main/fall-navigator/fall-navigator.sandbox';
import { FallNavService } from '@app/kiss4-main/fall-navigator/fall-navigator.service';
import { FallNavApiClient } from '@app/kiss4-main/fall-navigator/fall-navigatorApiClient.service';
import { DxToolbarModule } from 'devextreme-angular';
import { FallNavigatorFilterComponent } from './components/fall-navigator-filter/fall-navigator-filter.component';
import { FallTreeComponent } from './components/fall-navigator-tree/fall-navigator-tree.component';

const DxUiModule = [
    DxTreeListModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxFormModule,
    DxToolbarModule
];

const components: any[] = [
    FallNavigatorFilterComponent,
    FallTreeComponent
];

const containers: any[] = [
    TreeListComponent
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,
        DxUiModule,
        SharedComponentModule,
        LayoutContainersModule,
        FallNavigatorRoutingModule,
        StoreModule.forFeature(AppEnums.FeatureModule.fallnavigator, reducers),
        EffectsModule.forFeature([FallNavsEffects])
    ],
    declarations: [...containers, ...components],
    exports: [...components],
    providers: [
        FallNavsSandbox,
        FallNavService,
        FallNavApiClient
    ]
})
export class FallNavigatorModule { }
