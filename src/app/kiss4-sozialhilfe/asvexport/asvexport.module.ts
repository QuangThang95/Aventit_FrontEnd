import { StoreModule } from '@ngrx/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { AsvexportesEffects } from './store/effects/asvexport.effect';
import { reducers } from './store';
import { AsvexportListComponent } from './containers/asvexport-list.component';
import { AsvexportRoutingModule } from './asvexport-routing.module';
import { AsvexportApiClient } from './asvexport.ApiClient.service';
import { AsvexportService } from './asvexport.service';
import { AsvexportSandbox } from './asvexport.sandbox';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
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
import { DxFilterBuilderModule, DxValidatorModule, DxValidationGroupModule } from 'devextreme-angular';
import { DxTreeListModule } from 'devextreme-angular';

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
  DxValidatorModule,
  DxValidationGroupModule
];

const AsvexportListComponents: any[] = [
  AsvexportListComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.asvexport, reducers),
    EffectsModule.forFeature([AsvexportesEffects]),
    AsvexportRoutingModule
  ],
  declarations: [...AsvexportListComponents],
  providers: [
    AsvexportApiClient,
    AsvexportService,
    AsvexportSandbox,
  ]
})
export class AsvexportModule { }
