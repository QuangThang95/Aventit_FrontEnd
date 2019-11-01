import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FallfuhrungTreeModule } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { TabFallbearbeitungComponent } from './tab-fallbearbeitung/tab-fallbearbeitung.component';


const Components: any[] = [
  TabFallbearbeitungComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SimpleNotificationsModule,
    SharedComponentModule,
    LayoutContainersModule,
    FallfuhrungTreeModule
  ],
  declarations: [...Components],
  providers: [
  ],
  exports: [...Components]
})
export class TabFallbearbeitungModule { }
