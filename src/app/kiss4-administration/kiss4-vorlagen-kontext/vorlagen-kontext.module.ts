import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-administration/kiss4-vorlagen-kontext/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { SharedComponentModule } from './../../../shared/components/shared-component.module';
import { LayoutContainersModule } from './../../../shared/layouts/layouts.module';
import { VorlagenKontextEffects } from './store/effects/vorlagen-kontext.effect';
import { VorlagenKontextRoutingModule } from './vorlagen-kontext-routing.module';
import { VorlagenKontextSandbox } from './vorlagen-kontext.sandbox';
import { VorlagenKontextService } from './vorlagen-kontext.service';
import { VorlagenKontextComponent } from './container/vorlagen-kontext.component';
import { VorlagenKontextApiClient } from './vorlagen-kontextApiClient.service';

import { DetailComponent } from './components/detail/detail.component';
import { DetailViewComponent } from './components/view-mode/view-mode.component';
import { DetailEditComponent } from './components/edit-mode/edit-mode.component';
import { ErrorComponent } from './components/error/error.component';
import { DataListComponent } from './components/data-grid/data-grid.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';

const components: any[] = [
  VorlagenKontextComponent,
  DetailComponent,
  DetailViewComponent,
  DetailEditComponent,
  ErrorComponent,
  DataListComponent,
  MultiSelectComponent
];

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
  DxBoxModule,
  DxFileUploaderModule,
  DxCheckBoxModule,
  DxPopupModule,
  DxTreeListModule
];

@NgModule({
  imports: [
    CommonModule,
    DxUiModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    SharedComponentModule,
    LayoutContainersModule,
    VorlagenKontextRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.vorlagenKontext, reducers),
    EffectsModule.forFeature([VorlagenKontextEffects])
  ],
  declarations: components,
  providers: [
    VorlagenKontextSandbox,
    VorlagenKontextService,
    VorlagenKontextApiClient,
    VorlagenKontextEffects,
    ModuleConfigSandbox,
  ]
})
export class VorlagenKontextModule { }
