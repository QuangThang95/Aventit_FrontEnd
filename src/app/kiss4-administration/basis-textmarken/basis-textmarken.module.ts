import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-administration/basis-textmarken/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
    DxAutocompleteModule,
    DxBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxFilterBuilderModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxNumberBoxModule,
    DxPopoverModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
} from 'devextreme-angular';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { TextmarkenComponent } from './containers/basis-textmarken.component';
import { BasisTextmarkenDetailComponent } from './components/basis-textmarken-detail/basis-textmarken-detail.component';
import { BasisTextmarkenGridComponent } from './components/basis-textmarken-grid/basis-textmarken-grid.component';
import { BasisTextmarkenSearchComponent } from './components/basis-textmarken-search/basis-textmarken-search.component';
import { BasisTextmarkenDetailViewComponent } from './components/basis-textmarken-detail-view/basis-textmarken-detail-view.component';
import { TextmarkenRoutingModule } from './basis-textmarken-rouring.module';
import { TextmarkenSandbox } from './basis-textmarken.sandbox';
import { TextmarkenService } from './basis-textmarken.service';
import { TextmarkenApiClient } from './basis-textmarkenApiClient.service';
import { TextmarkenEffects } from './store/effects/basis-textmarken.effects';



const DxUiModule = [
    DxValidationGroupModule,
    DxValidatorModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxTextAreaModule,
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
    DxLoadIndicatorModule
];

const containers: any[] = [
    TextmarkenComponent,
    BasisTextmarkenDetailComponent,
    BasisTextmarkenGridComponent,
    BasisTextmarkenSearchComponent,
    BasisTextmarkenDetailViewComponent,
];
@NgModule({
    imports: [
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        CommonModule,
        DxUiModule,
        TranslateModule,
        SimpleNotificationsModule,
        ReactiveFormsModule,
        SharedComponentModule,
        LayoutContainersModule,
        TextmarkenRoutingModule,
        StoreModule.forFeature(AppEnums.FeatureModule.basistextmarken, reducers),
        EffectsModule.forFeature([TextmarkenEffects])
    ],
    declarations: [...containers],
    exports: [...containers],
    providers: [
        TextmarkenService,
        TextmarkenSandbox,
        TextmarkenApiClient,
    ]
})
export class BasistextmarkenModule {

}
