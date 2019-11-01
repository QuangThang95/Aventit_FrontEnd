import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '../../../shared/components/shared-component.module';
import { LayoutContainersModule } from '../../../shared/layouts/layouts.module';
import { DemographieComponent } from './demographie-form/demographie.component';
import { DemographieRoutingModule } from './denigraphie-rouring.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DxDataGridModule, DxTextBoxModule, DxButtonModule, DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxAutocompleteModule, DxFormModule, DxPopoverModule, DxPopupModule, DxBoxModule } from 'devextreme-angular';
import { AppEnums } from '@shared/AppEnum';
// import { reducers } from '@app/berater/store';
import { DemographieEffects } from './store/effects/demographie.effects';
import { DemografieModule } from '@app/kiss4-basis/demografie-history/demografie-history.module';


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
];

const containers: any[] = [
    DemographieComponent,
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
        DemographieRoutingModule,
        // StoreModule.forFeature(AppEnums.FeatureModule.demografie, reducers),
        EffectsModule.forFeature([DemographieEffects]),
        DemografieModule,
    ],
    declarations: [...containers],
    providers: [
    ]
})
export class DemographieModule { }
