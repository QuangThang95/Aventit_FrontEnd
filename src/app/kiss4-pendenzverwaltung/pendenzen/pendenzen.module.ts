import { StoreModule } from '@ngrx/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EffectsModule } from '@ngrx/effects';
import { PendenzensEffects } from './store/effects/pendenzens.effects';
import { reducers } from '@app/kiss4-pendenzverwaltung/pendenzen/store';

// register module devextreme
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';

import { PendenzenRoutingModule } from './pendenzen-routing.module';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { PendenzenVerwaltungComponent } from './pendenzen-verwaltung/pendenzen-verwaltung.component';
// register providers
import { PendenzenApiClient } from '@app/kiss4-pendenzverwaltung/pendenzen/pendenzenApiClient.service';
import { PendenzenService } from '@app/kiss4-pendenzverwaltung/pendenzen/pendenzen.service';
import { PendenzensSandbox } from '@app/kiss4-pendenzverwaltung/pendenzen/pendenzen.sandbox';
import { AppEnums } from '@shared/AppEnum';

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
  DxFilterBuilderModule
];

const components: any[] = [
  PendenzenVerwaltungComponent
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
    PendenzenRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.pendenzen, reducers),
    EffectsModule.forFeature([PendenzensEffects])
  ],
  declarations: [...components],
  providers: [
    PendenzenApiClient,
    PendenzenService,
    PendenzensSandbox
  ]
})
export class PendenzenModule { }
