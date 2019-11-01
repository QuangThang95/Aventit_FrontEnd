import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { PopOverComponent } from '@shared/components/popover/popover.component';
import { PopOverSandbox } from '@shared/components/popover/popover.sandbox';
import { Service } from '@shared/components/popover/popover.service';
import { PopOverApiClient } from '@shared/components/popover/popoverApiClient.service';
import { reducers } from '@shared/components/popover/store';
import { PopOverEffects } from '@shared/components/popover/store/effects/popover.effect';
import { PipesModule } from '@shared/pipes/pipes.module';
import { DevExtremeModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';

import { PopupConcurrencyComponent } from './popup-concurrency/popup-concurrency.component';
import { PopupConfirmComponent } from './popup-confirm/popup-confirm.component';
import { PopupPendencyComponent } from './popup-pendency/popup-pendency.component';
import { PrinterComponent } from './printer/printer.component';
import { ProgressbarComponent } from './progress-bar/progressbar.component';
import { RemainingMessageComponent } from './remaining-message/remaining-message.component';
import { RightComponentComponent } from './right-component/right-component.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TimeagoModule } from 'ngx-timeago';

const DxUiModule = [
  DevExtremeModule,
  DxSelectBoxModule,
];

const SHARED_COMPONENTS = [
  SpinnerComponent,
  PopupPendencyComponent,
  GridFunctionComponent,
  PrinterComponent,
  PopupConfirmComponent,
  RightComponentComponent,
  PopOverComponent,
  PopupConcurrencyComponent,
  ProgressbarComponent,
  RemainingMessageComponent
];
@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    DxUiModule,
    TimeagoModule,
    TranslateModule,
    StoreModule.forFeature(AppEnums.FeatureModule.popover, reducers),
    EffectsModule.forFeature([PopOverEffects]),
  ],
  declarations: [SHARED_COMPONENTS],
  exports: [SHARED_COMPONENTS, TimeagoModule],
  providers: [
    PopOverSandbox,
    PopOverApiClient,
    Service
  ]
})
export class SharedComponentModule {
}
