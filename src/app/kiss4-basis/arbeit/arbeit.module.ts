import { StoreModule } from '@ngrx/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { ArbeitEffects } from './store/effects/arbeit.effect';
import { reducers } from '@app/kiss4-basis/arbeit/store';
import { ArbeitApiClient } from '@app/kiss4-basis/arbeit/arbeitApiClient.service';
import { ArbeitService } from '@app/kiss4-basis/arbeit/arbeit.service';
import { ArbeitSandbox } from '@app/kiss4-basis/arbeit/arbeit.sandbox';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// register providers

import { AppEnums } from '@shared/AppEnum';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxAutocompleteModule } from 'devextreme-angular/ui/autocomplete';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxFilterBuilderModule } from 'devextreme-angular';
import { DxTreeListModule } from 'devextreme-angular';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { ArbeitRoutingModule } from './arbeit-routing.module';

import {DxValidatorModule} from 'devextreme-angular/ui/validator';
import {DxValidationGroupModule} from 'devextreme-angular/ui/validation-group';
import { ArbeitComponent } from './containers/arbeit.component';
import { ArbeitEditComponent } from './components/arbeit-edit/arbeit-edit.component';
import { ArbeitViewComponent } from './components/arbeit-view/arbeit-view.component';

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
  DxDropDownBoxModule,
  DxTextAreaModule,
  DxValidatorModule,
  DxValidationGroupModule
];

const ArbeitListComponents: any[] = [
  ArbeitComponent,
  ArbeitEditComponent,
  ArbeitViewComponent
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
    ArbeitRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.arbeit, reducers),
    EffectsModule.forFeature([ArbeitEffects]),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [...ArbeitListComponents],
  providers: [
    ArbeitApiClient,
    ArbeitService,
    ArbeitSandbox
  ]
})
export class ArbeitModule { }
