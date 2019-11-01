import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GemeindeDatenApiClient } from '@app/kiss4-modul-konfiguration/gemeinde-daten/gemeinde-daten.ApiClient.service';
import { GemeindeDatenSandbox } from '@app/kiss4-modul-konfiguration/gemeinde-daten/gemeinde-daten.sandbox';
import { GemeindeDatenService } from '@app/kiss4-modul-konfiguration/gemeinde-daten/gemeinde-daten.service';
import { reducers } from '@app/kiss4-modul-konfiguration/gemeinde-daten/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxFileUploaderModule,
  DxFilterBuilderModule,
  DxProgressBarModule,
  DxResponsiveBoxModule,
  DxTreeListModule,
} from 'devextreme-angular';
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

import { GemeindeDatenDetailComponent } from './components/gemeinde-daten-detail/gemeinde-daten-detail.component';
import { GemeindeDatenGridComponent } from './components/gemeinde-daten-grid/gemeinde-daten-grid.component';
import { GemeindeDatenUploadComponent } from './components/gemeinde-daten-upload/gemeinde-daten-upload.component';
import { GemeindeDatenComponent } from './containers/gemeinde-daten.component';
import { GemeindeDatenRoutingModule } from './gemeinde-daten-routing.module';
import { GemeindeDatensEffects } from './store/effects/gemeinde-daten.effect';

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
  DxProgressBarModule,
  DxResponsiveBoxModule
];

const GemeindeDatenComponents: any[] = [
  GemeindeDatenComponent,
  GemeindeDatenGridComponent,
  GemeindeDatenDetailComponent,
  GemeindeDatenUploadComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.gemeindedaten, reducers),
    EffectsModule.forFeature([GemeindeDatensEffects]),
    GemeindeDatenRoutingModule
  ],
  declarations: [...GemeindeDatenComponents],
  providers: [
    GemeindeDatenApiClient,
    GemeindeDatenService,
    GemeindeDatenSandbox,
  ]
})
export class GemeindeDatenModule { }
