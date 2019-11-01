import {CommonModule, DatePipe} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {TranslateModule} from '@ngx-translate/core';
import {AppEnums} from '@shared/AppEnum';
import {SharedComponentModule} from '@shared/components/shared-component.module';
import {LayoutContainersModule} from '@shared/layouts/layouts.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {DxBoxModule, DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFilterBuilderModule, DxPopupModule, DxToolbarModule} from 'devextreme-angular';

import {ClientListComponent} from '@app/kiss4-sozialhilfe/personen-im-haushalt/components/client-list/client-list.component';
import {ClientSumInfoComponent} from '@app/kiss4-sozialhilfe/personen-im-haushalt/components/client-sum-info/client-sum-info.component';
import {DataGridActionService} from '@app/kiss4-sozialhilfe/personen-im-haushalt/data-grid-action.service';
import {HeaderBarComponent} from '@app/kiss4-sozialhilfe/personen-im-haushalt/components/header-bar/header-bar.component';
import {PersonenImHaushaltRoutingModule} from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushalt-routing.module';
import {PersonenImHaushaltSandbox} from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushalt.sandbox';
import {PersonenImHaushaltService} from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushalt.service';
import {PersonenImHaushaltComponent} from '@app/kiss4-sozialhilfe/personen-im-haushalt/containers/personen-im-haushalt.component';
import {PersonenImHaushaltApiClient} from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushaltApiClient.service';
import {StaffInfoComponent} from '@app/kiss4-sozialhilfe/personen-im-haushalt/components/staff-info/staff-info.component';
import {reducers} from '@app/kiss4-sozialhilfe/personen-im-haushalt/store';
import {PersonenImHaushaltEffects} from '@app/kiss4-sozialhilfe/personen-im-haushalt/store/effects/personen-im-haushalt.effects';

// register module devextreme
// register providers
const DxUiModule = [
  DxBoxModule, DxDataGridModule, DxToolbarModule,
  DxButtonModule, DxPopupModule,
  DxFilterBuilderModule,
  DxCheckBoxModule
];

const components: any[] = [
  PersonenImHaushaltComponent,
  StaffInfoComponent,
  ClientListComponent,
  HeaderBarComponent,
  ClientSumInfoComponent,
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
    PersonenImHaushaltRoutingModule,
    StoreModule.forFeature(AppEnums.FeatureModule.personenimhaushalt, reducers),
    EffectsModule.forFeature([PersonenImHaushaltEffects])
  ],
  declarations: [...components],
  providers: [
    PersonenImHaushaltApiClient,
    PersonenImHaushaltService,
    PersonenImHaushaltSandbox,
    DatePipe,
    DataGridActionService
  ]
})
export class PersonenImHaushaltModule { }
