import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { KennzahlenComponent } from './pages/kennzahlen/kennzahlen.component';
import { KennzahlenRemainingComponent } from './components/kennzahlen-remaining/kennzahlen-remaining.component';
import { SearchBoxComponent } from './containers/kennzahlen-search-box/kennzahlen-search-box.component';
import { KennzahlenSandbox } from '@app/kiss4-sostat/kennzahlen/kennzahlen.sandbox';
import { KennzahlenService } from '@app/kiss4-sostat/kennzahlen/kennzahlen.service';
import { KennzahlenApiClient } from '@app/kiss4-sostat/kennzahlen/kennzahlenApiClient.service';
import { reducers } from '@app/kiss4-sostat/kennzahlen/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFileUploaderModule, DxFilterBuilderModule, DxProgressBarModule, DxTreeListModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
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

import { KennzahlenRoutingModule } from './kennzahlen-routing.module';
import { KennzahlensEffects } from './store/effects/kennzahlen.effect';
import { KennzahlenListComponent } from './containers/kennzahlen-list/kennzahlen-list.component';

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
  DxValidationGroupModule,
  DxValidatorModule
];

const KennzahlenListComponents: any[] = [
  KennzahlenComponent,
  SearchBoxComponent,
  KennzahlenRemainingComponent,
  KennzahlenListComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.kennzahlen, reducers),
    EffectsModule.forFeature([KennzahlensEffects]),
    KennzahlenRoutingModule
  ],
  declarations: [...KennzahlenListComponents],
  providers: [
    KennzahlenApiClient,
    KennzahlenService,
    KennzahlenSandbox,
  ]
})
export class KennzahlenModule { }
