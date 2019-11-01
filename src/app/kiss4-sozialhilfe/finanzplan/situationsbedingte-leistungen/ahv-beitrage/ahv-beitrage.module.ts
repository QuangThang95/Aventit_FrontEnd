import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store';
import { AppEnums } from '@shared/AppEnum';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { AhvBeitrageRoutingModule } from './ahv-beitrage-routing.module';
import { AhvBeitrageEffects } from './store/effects/ahv-beitrage.effect';
import { DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxFilterBuilderModule } from '@node_modules/devextreme-angular';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxProgressBarModule } from 'devextreme-angular';

import { AhvBeitrageApiClient } from './ahv-beitrageApiClient.service';
import { AhvBeitrageService } from './ahv-beitrage.service';
import { AhvBeitrageSandbox } from './ahv-beitrage.sandbox';
import { DxNumberBoxModule } from 'devextreme-angular';
import { Routes, RouterModule } from '@angular/router';

import {
  FormListComponent,
} from './components/ahv-beitrage-list/ahv-beitrage-list-component';

import {
  FormDetailComponent,
} from './components/ahv-beitrage-detail/ahv-beitrage-detail-component';

import {
  FormDetailEditComponent,
} from './components/ahv-beitrage-detail-edit/ahv-beitrage-detail-edit-component';

import {
  FormDetailViewComponent,
} from './components/ahv-beitrage-detail-view/ahv-beitrage-detail-view-component';

import {
  AhvBeitrageComponent
} from './containers/ctl-ahv-beitrage/ahv-beitrag.component';

const DxUiModule = [
  DxValidationGroupModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxTreeListModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxFormModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxTextAreaModule,
  DxToolbarModule,
  DxDropDownBoxModule,
  DxFilterBuilderModule,
  DxPopupModule,
  DxProgressBarModule,
  DxNumberBoxModule,
  DxValidatorModule
];

const AhvBeitrageComponents: any[] = [
  AhvBeitrageComponent,
  FormListComponent,
  FormDetailComponent,
  FormDetailEditComponent,
  FormDetailViewComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.ahvBeitrage, reducers),
    EffectsModule.forFeature([AhvBeitrageEffects]),
    AhvBeitrageRoutingModule,
  ],
  declarations: [...AhvBeitrageComponents],
  providers: [
    AhvBeitrageApiClient,
    AhvBeitrageService,
    AhvBeitrageSandbox
  ]
})

export class AhvBeitrageModule { }
