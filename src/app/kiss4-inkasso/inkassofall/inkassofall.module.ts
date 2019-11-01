import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    InkassofallListComponent,
} from '@app/kiss4-inkasso/inkassofall/components/inkassofall-list/inkassofall-list.component';
import { InkassofallRoutingModule } from '@app/kiss4-inkasso/inkassofall/inkassofall-routing.module';
import { InkassofallApiClient } from '@app/kiss4-inkasso/inkassofall/inkassofall.ApiClient.service';
import { InkassofallSandbox } from '@app/kiss4-inkasso/inkassofall/inkassofall.sandbox';
import { InkassofallService } from '@app/kiss4-inkasso/inkassofall/inkassofall.service';
import { reducers } from '@app/kiss4-inkasso/inkassofall/store';
import { InkassofallEffects } from '@app/kiss4-inkasso/inkassofall/store/effects/inkassofall.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxCheckBoxModule, DxNumberBoxModule, DxPopupModule, DxTagBoxModule, DxTemplateModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxiFieldModule } from 'devextreme-angular/ui/nested/field-dxi';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { InkassofallDetailEditComponent } from './components/inkassofall-detail-edit/inkassofall-detail-edit.component';
import { InkassofallDetailViewComponent } from './components/inkassofall-detail-view/inkassofall-detail-view.component';
import { InkassofallDetailComponent } from './components/inkassofall-detail/inkassofall-detail.component';
import { InkassofallComponent } from './containers/inkassofall.component';

// register module devextreme
// register providers
const DxUiModule = [
    DxContextMenuModule,
    DxTreeViewModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxToolbarModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxValidationGroupModule,
    DxTooltipModule,
    DxValidatorModule,
    DxFilterBuilderModule,
    DxPopupModule,
    DxTemplateModule,
    DxTagBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxiFieldModule
];

const components: any[] = [
    InkassofallComponent,
    InkassofallListComponent,
    InkassofallDetailComponent,
    InkassofallDetailEditComponent,
    InkassofallDetailViewComponent
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        SimpleNotificationsModule,
        DxUiModule,
        SharedComponentModule,
        LayoutContainersModule,
        InkassofallRoutingModule,
        StoreModule.forFeature(AppEnums.FeatureModule.inkassofall, reducers),
        EffectsModule.forFeature([InkassofallEffects])
    ],
    declarations: [...components],
    providers: [
        InkassofallApiClient,
        InkassofallService,
        InkassofallSandbox
    ]
})
export class InkassofallModule {
}


