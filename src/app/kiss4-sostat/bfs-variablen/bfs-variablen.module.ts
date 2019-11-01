import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VariablenApiClient } from '@app/kiss4-sostat/bfs-variablen/bfs-variablen.ApiClient.service';
import { VariablenSandbox } from '@app/kiss4-sostat/bfs-variablen/bfs-variablen.sandbox';
import { VariablenService } from '@app/kiss4-sostat/bfs-variablen/bfs-variablen.service';
import {
  VariablenListComponent,
} from '@app/kiss4-sostat/bfs-variablen/components/bfs-variablen-list/bfs-variablen-list.component';
import {
  VariablenSearchComponent,
} from '@app/kiss4-sostat/bfs-variablen/components/bfs-variablen-search/bfs-variablen-search.component';
import { VariablenComponent } from '@app/kiss4-sostat/bfs-variablen/containers/bfs-variablen.component';
import { reducers } from '@app/kiss4-sostat/bfs-variablen/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DxFileUploaderModule, DxFilterBuilderModule, DxProgressBarModule, DxTreeListModule } from 'devextreme-angular';
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

import { VariablenRoutingModule } from './bfs-variablen-routing.module';
import {
  VariablenMitarbeiterDropdownGridComponent,
} from './components/bfs-variablen-mitarbeiter-dropdown-grid/bfs-variablen-mitarbeiter-dropdown-grid.component';
import { VariablenProgressBarComponent } from './components/bfs-variablen-progress-bar/bfs-variablen-progress-bar.component';
import {
  VariablenRemainingMessageComponent,
} from './components/bfs-variablen-remaining-message/bfs-variablen-remaining-message.component';
import { VariablenEffects } from './store/effects/bfs-variablen.effect';
import { VariablenKlientDropdownGridComponent } from './components/bfs-variablen-klient-dropdown-grid/bfs-variablen-klient-dropdown-grid.component';

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
  DxFilterBuilderModule,
  DxTreeListModule,
  DxFileUploaderModule,
  DxProgressBarModule,
  DxDropDownBoxModule
];

const VariablenComponents: any[] = [
  VariablenRemainingMessageComponent,
  VariablenComponent,
  VariablenListComponent,
  VariablenSearchComponent,
  VariablenProgressBarComponent,
  VariablenMitarbeiterDropdownGridComponent,
  VariablenKlientDropdownGridComponent
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
    StoreModule.forFeature(AppEnums.FeatureModule.gemeindeVariablen, reducers),
    EffectsModule.forFeature([VariablenEffects]),
    VariablenRoutingModule
  ],
  declarations: [...VariablenComponents ],
  providers: [
    VariablenApiClient,
    VariablenService,
    VariablenSandbox,
  ]
})
export class VariablenModule { }
