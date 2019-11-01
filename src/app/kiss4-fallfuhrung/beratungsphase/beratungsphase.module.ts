import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxFilterBuilderModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTooltipModule,
  DxTreeListModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { DxAutocompleteModule } from 'devextreme-angular/ui/autocomplete';
import { DxBoxModule } from 'devextreme-angular/ui/box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';

import { BeratungsphaseListComponent } from './containers/beratungsphase-list.component';
import { BeratungsphaseRoutingModule } from './beratungsphase-routing.module';
import { BeratungsphaseSandbox } from './beratungsphase.sandbox';
import { BeratungsphaseService } from './beratungsphase.service';
import { BeratungsphaseApiClient } from './beratungsphaseApiClient.service';
import { reducers } from './store';
import { BeratungsphaseEffects } from './store/effects/beratungsphase.effect';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
  DxTreeListModule,
  DxFilterBuilderModule,
  DxTreeViewModule,
  DxTooltipModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxDropDownBoxModule,
  DxValidatorModule,
  DxValidationGroupModule
];

const BeratungsphaseListComponents: any[] = [
  BeratungsphaseListComponent,
];

const routes: Routes = [
  {
    path: '',
    component: BeratungsphaseListComponent,
  }
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
    StoreModule.forFeature(AppEnums.FeatureModule.beratungsphase, reducers),
    EffectsModule.forFeature([BeratungsphaseEffects]),
    BeratungsphaseRoutingModule,
    RouterModule.forChild(routes),
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [...BeratungsphaseListComponents],
  providers: [
    BeratungsphaseApiClient,
    BeratungsphaseService,
    BeratungsphaseSandbox,
  ]
})
export class BeratungsphaseModule { }
