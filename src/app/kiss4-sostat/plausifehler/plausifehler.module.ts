import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlausifehlerListComponent } from '@app/kiss4-sostat/plausifehler/containers/plausifehler-list/plausifehler-list.component';
import { PlausifehlerSandbox } from '@app/kiss4-sostat/plausifehler/plausifehler.sandbox';
import { PlausifehlerService } from '@app/kiss4-sostat/plausifehler/plausifehler.service';
import { PlausifehlerApiClient } from '@app/kiss4-sostat/plausifehler/plausifehlerApiClient.service';
import { reducers } from '@app/kiss4-sostat/plausifehler/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFileUploaderModule, DxFilterBuilderModule, DxProgressBarModule, DxTreeListModule, DxListModule } from 'devextreme-angular';
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
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { PlausifehlerRoutingModule } from './plausifehler-routing.module';
import { PlausifehlersEffects } from './store/effects/plausifehler.effect';
import {PlausifehlerSearchComponent} from '@app/kiss4-sostat/plausifehler/components/plausifehler-search/plausifehler-search.component';
import {PlausifehlerComponent} from '@app/kiss4-sostat/plausifehler/pages/plausifehler.component';

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
  DxDropDownBoxModule,
  DxListModule
];

const PlausifehlerComponents: any[] = [
  PlausifehlerListComponent, PlausifehlerSearchComponent, PlausifehlerComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.plausifehler, reducers),
    EffectsModule.forFeature([PlausifehlersEffects]),
    PlausifehlerRoutingModule
  ],
  declarations: [...PlausifehlerComponents],
  providers: [
    PlausifehlerApiClient,
    PlausifehlerService,
    PlausifehlerSandbox,
  ]
})
export class PlausifehlerModule { }
