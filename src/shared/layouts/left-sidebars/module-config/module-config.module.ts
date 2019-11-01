import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { AuthorizeModule } from '@shared/authorize/authorize.module';
import { reducers } from '@shared/layouts/left-sidebars/module-config/store';
import { DxButtonModule, DxPopupModule, DxTreeViewModule } from 'devextreme-angular';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { ModuleConfigNavigatorComponent } from './module-config-navigator/module-config-navigator.component';
import { ModuleConfigSandbox } from './module-config.sandbox';
import { ModuleConfigService } from './module-config.service';
import { ModuleConfigApiClient } from './module-configApiClient.service';
import { ModuleConfigNavigatorEffects } from './store/effects/module-config-navigator.effect';

const DxUiModule = [
    DxTreeViewModule,
    DxPopupModule,
    DxButtonModule
];

const ModuleConfigComponents = [
    ModuleConfigNavigatorComponent
];

@NgModule({
    declarations: [
        ModuleConfigComponents
    ],
    imports: [
        CommonModule,
        DxUiModule,
        TranslateModule,
        SharedComponentModule,
        StoreModule.forFeature(AppEnums.FeatureModule.moduleConfigNavigator, reducers),
        EffectsModule.forFeature([ModuleConfigNavigatorEffects]),
        AuthorizeModule.forFeature()
    ],
    providers: [
        ModuleConfigApiClient,
        ModuleConfigService,
        ModuleConfigSandbox,
    ],
    exports: [ModuleConfigComponents]
})
export class ModuleConfigModule { }
