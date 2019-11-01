import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    GemeindeCodeListComponent,
} from '@app/kiss4-sostat/gemeinde-code/components/gemeinde-code-list/gemeinde-code-list.component';
import {
    GemeindeCodeSearchComponent,
} from '@app/kiss4-sostat/gemeinde-code/components/gemeinde-code-search/gemeinde-code-search.component';
import { GemeindeCodeApiClient } from '@app/kiss4-sostat/gemeinde-code/gemeinde-code.ApiClient.service';
import { GemeindeCodeSandbox } from '@app/kiss4-sostat/gemeinde-code/gemeinde-code.sandbox';
import { GemeindeCodeService } from '@app/kiss4-sostat/gemeinde-code/gemeinde-code.service';
import { GemeindeCodeComponent } from '@app/kiss4-sostat/gemeinde-code/containers/gemeinde-code.component';
import { reducers } from '@app/kiss4-sostat/gemeinde-code/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFileUploaderModule, DxFilterBuilderModule, DxProgressBarModule, DxTreeListModule } from 'devextreme-angular';
import { DxAutocompleteModule } from 'devextreme-angular/ui/autocomplete';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import {
    GemeindeCodeRemainingMessageComponent,
} from './components/gemeinde-code-remaining-message/gemeinde-code-remaining-message.component';
import { GemeindeCodeRoutingModule } from './gemeinde-code-routing.module';
import { GemeindeCodeEffects } from './store/effects/gemeinde-code.effect';

const DxUiModule = [
    DxToolbarModule,
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
    DxDateBoxModule,
    DxFilterBuilderModule,
    DxTreeListModule,
    DxFileUploaderModule,
    DxProgressBarModule
];

const GemeindeCodeListComponents: any[] = [
    GemeindeCodeRemainingMessageComponent,
    GemeindeCodeListComponent,
    GemeindeCodeSearchComponent,
    GemeindeCodeComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SimpleNotificationsModule,
        SharedComponentModule,
        LayoutContainersModule,
        DxUiModule,
        StoreModule.forFeature(AppEnums.FeatureModule.gemeindecode, reducers),
        EffectsModule.forFeature([GemeindeCodeEffects]),
        GemeindeCodeRoutingModule
    ],
    declarations: [...GemeindeCodeListComponents],
    providers: [
        GemeindeCodeApiClient,
        GemeindeCodeService,
        GemeindeCodeSandbox
    ]
})
export class GemeindeCodeModule { }
