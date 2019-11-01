import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UberComponent } from '@app/kiss4-main/uber/containers/uber.component';
import { reducers } from '@app/kiss4-main/uber/store';
import { UbersSandbox } from '@app/kiss4-main/uber/uber.sandbox';
import { UberService } from '@app/kiss4-main/uber/uber.service';
import { UberApiClient } from '@app/kiss4-main/uber/uberApiClient.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
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
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { UberAssembliesComponent } from './components/uber-assemblies/uber-assemblies.component';
import { UberDatenbankVersionenComponent } from './components/uber-datenbank-versionen/uber-datenbank-versionen.component';
import { UberDatenbankComponent } from './components/uber-datenbank/uber-datenbank.component';
import { UberDetailComponent } from './components/uber-detail/uber-detail.component';
import { UberSpeicherComponent } from './components/uber-speicher/uber-speicher.component';
import { UberEffects } from './store/effects/uber.effect';
import { UberRoutingModule } from './uber-routing.module';


// register providers

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
  DxScrollViewModule
];
const componentsUber: any[] = [
  UberComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.uber, reducers),
    EffectsModule.forFeature([UberEffects]),
    UberRoutingModule
  ],
  declarations: [...componentsUber, UberDetailComponent, UberDatenbankComponent, UberDatenbankVersionenComponent, UberAssembliesComponent, UberSpeicherComponent],
  providers: [
    UberApiClient,
    UberService,
    UbersSandbox,
  ]
})
export class UberModule { }
