import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { FallbearbeitungComponent } from './fallbearbeitung/fallbearbeitung.component';
import { FallbearbeitungRoutingModule } from './fallbearbeitung-routing.module';
import { TabFallbearbeitungModule } from '../tab-fallbearbeitung/tab-fallbearbeitung.module';


const Components: any[] = [
  FallbearbeitungComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    SharedComponentModule,
    LayoutContainersModule,
    FallbearbeitungRoutingModule,
    TabFallbearbeitungModule
  ],
  declarations: [...Components],
  providers: [
  ]
})
export class FallbearbeitungModule { }
