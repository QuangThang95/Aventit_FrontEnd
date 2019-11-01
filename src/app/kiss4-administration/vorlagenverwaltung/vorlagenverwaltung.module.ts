import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { LayoutContainersModule } from '@shared/layouts/layouts.module';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { VorlagenverwaltungComponent } from './vorlagenverwaltung-from/vorlagenverwaltung.component';
import { VorlagenverwaltungRoutingModule } from './vorlagenverwaltung-routing.module';

const components: any[] = [
  VorlagenverwaltungComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SimpleNotificationsModule,
    SharedComponentModule,
    LayoutContainersModule,
    VorlagenverwaltungRoutingModule,
  ],
  declarations: [...components],
  providers: [
    ModuleConfigSandbox
  ]
})

export class VorlagenverwaltungModule {
}
