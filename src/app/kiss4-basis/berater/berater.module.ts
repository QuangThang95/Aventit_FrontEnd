import { NgModule } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { BeraterComponent } from './containers/berater/berater.component';
import { BeraterFormListComponent } from './components/berater-list/berater-list.component';
import { BeraterFormSearchComponent } from './components/berater-search/berater-search.component';
import { BeraterFormDetailComponent } from './components/berater-detail/berater-detail.component';
import { BeraterFormDetailViewComponent } from './components/berater-detail-view/berater-detail-view.component';
import { BeraterFormDetailEditComponent } from './components/berater-detail-edit/berater-detail-edit.component';
import { BeraterService } from './berater.service';
import { BeraterApiClient } from './beraterApiClient.service';
import { BeraterSandbox } from './berater.sandbox';
import { BeraterRoutingModule } from './berater-rouring.module';
import { BeraterEffects } from './store/effects/berater.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';

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
import { DxFilterBuilderModule, DxValidatorModule } from '@node_modules/devextreme-angular';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


const DxUiModule = [
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
  DxValidatorModule
];

const containers: any[] = [
  BeraterComponent,
  BeraterFormListComponent,
  BeraterFormSearchComponent,
  BeraterFormDetailComponent,
  BeraterFormDetailViewComponent,
  BeraterFormDetailEditComponent
];

@NgModule({
  imports: [
    CommonModule,
    DxUiModule,
    TranslateModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    SharedComponentModule,
    LayoutContainersModule,
    BeraterRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.berater, reducers),
    EffectsModule.forFeature([BeraterEffects]),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [...containers],
  exports: [...containers],
  providers: [
    BeraterService,
    BeraterSandbox,
    BeraterApiClient,
  ]
})
export class BeraterModule {

}
