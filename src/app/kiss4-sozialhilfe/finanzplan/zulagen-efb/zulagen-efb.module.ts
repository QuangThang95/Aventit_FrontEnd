import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {ZulagenEfbComponent} from './containers/zulagen-efb.component';
import {AuthGuard} from '@shared/guards/auth.guard';
import {CanDeactivateGuard} from '@shared/guards/canDeactivate.guard';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';

import {
  DxBoxModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxFilterBuilderModule,
  DxFormModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxValidationGroupModule,
  DxToolbarModule
} from 'devextreme-angular';
import {LayoutContainersModule} from '@shared/layouts/layouts.module';
import {SharedComponentModule} from '@shared/components/shared-component.module';
import {HeaderBarComponent} from './components/header-bar/header-bar.component';
import {ZulagenEfbListComponent} from './components/zulagen-efb-list/zulagen-efb-list.component';
import {ZulagenEfbFormComponent} from './components/zulagen-efb-form/zulagen-efb-form.component';
import {ZulagenEfbViewComponent} from './components/zulagen-efb-view/zulagen-efb-view.component';

const Components: any[] = [
  ZulagenEfbComponent,
  HeaderBarComponent,
  ZulagenEfbListComponent,
  ZulagenEfbFormComponent,
  ZulagenEfbViewComponent
];

const routes: Routes = [
  {
    path: '',
    component: ZulagenEfbComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

const DxUiModule = [
  DxBoxModule, DxDataGridModule, DxToolbarModule,
  DxButtonModule, DxPopupModule,
  DxFilterBuilderModule,
  DxCheckBoxModule,
  DxFormModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxTextAreaModule,
  DxValidatorModule,
  DxValidationGroupModule
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedComponentModule,
    LayoutContainersModule,
    DxUiModule,
    DxSelectBoxModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  declarations: [...Components],
})
export class ZulagenEfbModule {
}
