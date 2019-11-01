import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-basis/demografie-history/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
    DxAutocompleteModule,
    DxBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxFilterBuilderModule,
    DxFormModule,
    DxNumberBoxModule,
    DxPopoverModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxScrollViewModule,
} from 'devextreme-angular';

import { SharedComponentModule } from '../../../shared/components/shared-component.module';
import { LayoutContainersModule } from '../../../shared/layouts/layouts.module';
import { DemografieHistoryComponent } from './demografie-history-form/demografie-history.component';
import { DemografieRoutingModule } from './demografie-history-routing.module';
import { DemografieSandbox } from './demografie-history.sandbox';
import { DemografieService } from './demografie-history.service';
import { DemografieApiClient } from './demografie-historyApiClient.service';
import { DemografieEffects } from './store/effects/demografie-history.effects';

const DxUiModule = [
    DxDataGridModule,
    DxTextBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxAutocompleteModule,
    DxFormModule,
    DxPopupModule,
    DxBoxModule,
    DxPopoverModule,
    DxToolbarModule,
    DxFilterBuilderModule,
    DxScrollViewModule,
];

const containers: any[] = [
    DemografieHistoryComponent,
];
@NgModule({
    imports: [
        CommonModule,
        DxUiModule,
        TranslateModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        LayoutContainersModule,
        DemografieRoutingModule,
        StoreModule.forFeature(AppEnums.FeatureModule.demografie, reducers),
        EffectsModule.forFeature([DemografieEffects])
    ],
    declarations: [...containers],
    exports: [...containers],
    providers: [
        DemografieService,
        DemografieSandbox,
        DemografieApiClient,
    ]
})
export class DemografieModule { }
