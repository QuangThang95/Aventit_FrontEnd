import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FallNavsSandbox } from '@app/kiss4-main/fall-navigator/fall-navigator.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxContextMenuModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFilterBuilderModule,
  DxFormModule,
  DxPopoverModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTreeViewModule,
  DxValidationGroupModule,
} from 'devextreme-angular';

import { FallfuhrungTreeSandbox } from './fallfuhrung-tree.sandbox';
import { FallfuhrungTreeService } from './fallfuhrung-tree.service';
import { FallfuhrungTreeComponent } from './fallfuhrung-tree/fallfuhrung-tree.component';
import { FallfuhrungTreeApiClient } from './fallfuhrung-treeApiClient.service';
import { reducers } from './store';
import { FallfuhrungTreeEffects } from './store/effects/fallfuhrung-tree.effects';

const DxUiModule = [
  DxPopupModule,
  DxContextMenuModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxPopupModule,
  DxButtonModule,
  DxToolbarModule,
  DxFormModule,
  DxValidationGroupModule,
  DxTooltipModule,
  DxFilterBuilderModule,
  DxCheckBoxModule,
  DxScrollViewModule,
  DxPopoverModule,
];

const Components: any[] = [
  FallfuhrungTreeComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    StoreModule.forFeature(AppEnums.FeatureModule.fallfuhrungTree, reducers),
    EffectsModule.forFeature([FallfuhrungTreeEffects]),
    DxUiModule,
  ],
  declarations: [...Components],
  providers: [
    FallfuhrungTreeService,
    FallfuhrungTreeSandbox,
    FallfuhrungTreeApiClient,
    DatePipe,
    FallNavsSandbox
  ],
  exports: [...Components]
})
export class FallfuhrungTreeModule { }
