import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFilterBuilderModule, DxResponsiveBoxModule, DxTreeListModule } from 'devextreme-angular';
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

import { CtlBfsDokumenteRoutingModule } from './ctl-bfs-dokumente-routing.module';
import { CtlBfsDokumenteApiClient } from './ctl-bfs-dokumente.ApiClient.service';
import { CtlBfsDokumenteSandbox } from './ctl-bfs-dokumente.sandbox';
import { CtlBfsDokumenteService } from './ctl-bfs-dokumente.service';
import { CtlBfsDokumenteComponent } from './containers/ctl-bfs-dokumente.component';
import { reducers } from './store';
import { CtlBfsDokumentesEffects } from './store/effects/ctl-bfs-dokumente.effect';

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
  DxResponsiveBoxModule
];

const CtlBfsDokumenteComponents: any[] = [
  CtlBfsDokumenteComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.ctlbfsdokumente, reducers),
    EffectsModule.forFeature([CtlBfsDokumentesEffects]),
    CtlBfsDokumenteRoutingModule
  ],
  declarations: [...CtlBfsDokumenteComponents],
  providers: [
    CtlBfsDokumenteApiClient,
    CtlBfsDokumenteService,
    CtlBfsDokumenteSandbox
  ]
})
export class CtlBfsDokumenteModule { }
