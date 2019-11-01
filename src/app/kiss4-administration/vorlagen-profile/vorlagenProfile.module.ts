import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@app/kiss4-administration/vorlagen-profile/store';
import { VorlagenProfileSandbox } from '@app/kiss4-administration/vorlagen-profile/vorlagenProfile.sandbox';
import { VorlagenProfileService } from '@app/kiss4-administration/vorlagen-profile/vorlagenProfile.service';
import { VorlagenProfileApiClient } from '@app/kiss4-administration/vorlagen-profile/vorlagenProfileApiClient.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxLoadIndicatorModule, DxPopupModule, DxTagBoxModule, DxBoxModule } from 'devextreme-angular';
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
import { VorlagenProfileEffects } from './store/effects/vorlagenProfile.effects';
import { VorlagenProfileComponent } from './vorlagenProfile-from/vorlagenProfile.component';
import { VorlagenProfileRoutingModule } from './vorlagenProfile-routing.module';

// register module devextreme
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
  DxTagBoxModule,
  DxPopupModule,
  DxLoadIndicatorModule,
  DxBoxModule
];

// register providers
const components: any[] = [
  VorlagenProfileComponent
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
    VorlagenProfileRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.vorlagenprofile, reducers),
    EffectsModule.forFeature([VorlagenProfileEffects])
  ],
  declarations: [...components],
  providers: [
    VorlagenProfileApiClient,
    VorlagenProfileService,
    VorlagenProfileSandbox
  ]
})
export class VorlagenProfileModule { }
