import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFilterBuilderModule, DxTextAreaModule, DxTreeListModule, DxValidatorModule, DxValidationGroupModule } from 'devextreme-angular';
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

import { FallfuhrungRoutingModule } from './fallfuhrung-routing.module';
import { FallfuhrungSandbox } from './fallfuhrung.sandbox';
import { FallfuhrungService } from './fallfuhrung.service';
import { FallfuhrungComponent } from './containers/fallfuhrung.component';
import { FallfuhrungApiClient } from './fallfuhrung.ApiClient.service';
import { FallfuhrungsEffects } from './store/effects/fallfuhrung.effect';

// register providers

// import notify from 'devextreme/ui/notify';
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
  DxTextAreaModule,
  DxValidatorModule,
  DxValidationGroupModule
];

const FallfuhrungListComponents: any[] = [
    FallfuhrungComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.fallfuhrung, reducers),
    EffectsModule.forFeature([FallfuhrungsEffects]),
    FallfuhrungRoutingModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [...FallfuhrungListComponents],
  providers: [
    FallfuhrungApiClient,
    FallfuhrungService,
    FallfuhrungSandbox,
  ]
})
export class FallfuhrungModule { }
