import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { reducers } from '@app/kiss4-sozialhilfe/whleistung/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxNumberBoxModule, DxPopupModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

import { WhLeistungEffects } from './store/effects/whleistung.effects';
import { WhLeistungComponent } from './whleistung-from/whleistung.component';
import { WhLeistungRoutingModule } from './whleistung-routing.module';
import { WhLeistungSandbox } from './whleistung.sandbox';
import { WhLeistungService } from './whleistung.service';
import { WhLeistungApiClient } from './whleistungApiClient.service';

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
  DxNumberBoxModule,
  DxPopupModule
];

const components: any[] = [
  WhLeistungComponent
];

const routes: Routes = [
  {
    path: '',
    component: WhLeistungComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    DxUiModule,
    SharedComponentModule,
    LayoutContainersModule,
    WhLeistungRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.whleistung, reducers),
    EffectsModule.forFeature([WhLeistungEffects]),
    RouterModule.forChild(routes),
  ],
  declarations: [...components],
  providers: [
    WhLeistungApiClient,
    WhLeistungService,
    WhLeistungSandbox
  ]
})
export class WhLeistungModule { }
