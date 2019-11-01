import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BalandRoutingModule } from '@app/kiss4-modul-konfiguration/baland/baland-routing.module';
import { BalandApiClient } from '@app/kiss4-modul-konfiguration/baland/baland.ApiClient.service';
import { BalandSandbox } from '@app/kiss4-modul-konfiguration/baland/baland.sandbox';
import { BalandService } from '@app/kiss4-modul-konfiguration/baland/baland.service';
import {
  BalandDetailComponent,
} from '@app/kiss4-modul-konfiguration/baland/components/baland-detail/baland-detail.component';
import { BalandListComponent } from '@app/kiss4-modul-konfiguration/baland/components/baland-list/baland-list.component';
import { BalandComponent } from '@app/kiss4-modul-konfiguration/baland/containers/baland.component';
import { reducers } from '@app/kiss4-modul-konfiguration/baland/store';
import { BalandsEffects } from '@app/kiss4-modul-konfiguration/baland/store/effects/baland.effect';
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

const BalandComponents: any[] = [
  BalandComponent,
  BalandListComponent,
  BalandDetailComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.baland, reducers),
    EffectsModule.forFeature([BalandsEffects]),
    BalandRoutingModule
  ],
  declarations: [...BalandComponents],
  providers: [
    BalandApiClient,
    BalandService,
    BalandSandbox,
  ]
})
export class BalandModule { }
