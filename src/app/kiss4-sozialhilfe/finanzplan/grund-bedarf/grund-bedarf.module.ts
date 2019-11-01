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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFilterBuilderModule, DxTemplateModule, DxTextAreaModule, DxTooltipModule, DxTreeListModule } from 'devextreme-angular';
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
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { GrundBedarfDetailEditComponent } from './components/grundbedarf-detail-edit/grundbedarf-detail-edit.component';
import { GrundBedarfDetailViewComponent } from './components/grundbedarf-detail-view/grundbedarf-detail-view.component';
import { FormDetailComponent } from './components/grundbedarf-detail/grundbedarf-detail.component';
import { CtlBfsGrundbedarfComponent } from './containers/ctl-bfs-grundbedarf/ctl-bfs-grundbedarf.component';
import { GrundBedarfRoutingModule } from './grund-bedarf-routing.module';
import { GrundBedarfSandbox } from './grund-bedarf.sandbox';
import { GrundBedarfService } from './grund-bedarf.service';
import { GrundBedarfApiClient } from './grund-bedarfApiClient.service';
import { reducers } from './store';
import { GrundBedarfEffects } from './store/effects/grund-bedarf.effect';
import { PersonenImHaushaltSandbox } from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushalt.sandbox';


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
  DxValidationGroupModule,
];

const GrundBedarfListComponents: any[] = [
  CtlBfsGrundbedarfComponent,
  FormDetailComponent,
  GrundBedarfDetailEditComponent,
  GrundBedarfDetailViewComponent,
];

const routes: Routes = [
  {
    path: '',
    component: CtlBfsGrundbedarfComponent,
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
    StoreModule.forFeature(AppEnums.FeatureModule.grundBedarf, reducers),
    EffectsModule.forFeature([GrundBedarfEffects]),
    GrundBedarfRoutingModule,
    RouterModule.forChild(routes),
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [...GrundBedarfListComponents],
  providers: [
    GrundBedarfApiClient,
    GrundBedarfService,
    GrundBedarfSandbox,
    PersonenImHaushaltSandbox,
  ]
})
export class GrundBedarfModule { }
