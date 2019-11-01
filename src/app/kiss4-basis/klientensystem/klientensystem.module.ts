import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-basis/klientensystem/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxCheckBoxModule,
  DxLoadIndicatorModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxTagBoxModule,
  DxBoxModule,
} from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { KlientensystemComponent } from './klientensystem-from/klientensystem.component';
import { KlientensystemRoutingModule } from './klientensystem-routing.module';
import { KlientensystemSandbox } from './klientensystem.sandbox';
import { KlientensystemService } from './klientensystem.service';
import { KlientensystemApiClient } from './klientensystemApiClient.service';
import { KlientensystemEffects } from './store/effects/klientensystem.effects';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// register module devextreme
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
  DxTagBoxModule,
  DxPopupModule,
  DxLoadIndicatorModule,
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxBoxModule
];

// register providers
const components: any[] = [
  KlientensystemComponent
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
    KlientensystemRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.klientensystem, reducers),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    EffectsModule.forFeature([KlientensystemEffects])
  ],
  declarations: [...components],
  providers: [
    KlientensystemApiClient,
    KlientensystemService,
    KlientensystemSandbox
  ]
})
export class KlientensystemModule { }
