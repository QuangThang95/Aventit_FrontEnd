import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormSeachComponent,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/components/fragenkatalog-search/fragenkatalog-search.component';
import {
  FormDetailComponent,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/containers/fragenkatalog-detail/fragenkatalog-detail.component';
import {
  FormListComponent,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/components/fragenkatalog-list/fragenkatalog-list.component';
import {
  CtlBfsFragenkatalogRoutingModule,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog-routing.module';
import {
  CtlBfsFragenkatalogApiClient,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.ApiClient.service';
import { CtlBfsFragenkatalogSandbox } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.sandbox';
import { CtlBfsFragenkatalogService } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.service';
import { CtlBfsFragenkatalogComponent } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/pages/ctl-bfs-fragenkatalog.component';
import { reducers } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/store';
import {
  CtlBfsFragenkatalogEffects,
} from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/store/effects/ctl-bfs-fragenkatalog.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxCheckBoxModule, DxNumberBoxModule, DxPopupModule, DxTagBoxModule, DxTemplateModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxiFieldModule } from 'devextreme-angular/ui/nested/field-dxi';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';

// register module devextreme
// register providers
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
  DxPopupModule,
  DxTemplateModule,
  DxTagBoxModule,
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxiFieldModule
];

const components: any[] = [
  CtlBfsFragenkatalogComponent, FormListComponent, FormDetailComponent, FormSeachComponent
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
    CtlBfsFragenkatalogRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.ctlbfsfragenkatalog, reducers),
    EffectsModule.forFeature([CtlBfsFragenkatalogEffects])
  ],
  declarations: [...components],
  providers: [
    CtlBfsFragenkatalogApiClient,
    CtlBfsFragenkatalogService,
    CtlBfsFragenkatalogSandbox
  ]
})
export class CtlBfsFragenkatalogModule {
}


