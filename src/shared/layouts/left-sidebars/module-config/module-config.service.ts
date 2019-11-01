import { Injectable } from '@angular/core';

import { ModuleConfigNavigatorItem } from './models';

@Injectable()
export class ModuleConfigService {
    static getModuleConfigNavigatorItemsAdapter(ModuleConfigNavigatorItems: any): Array<any> {
        return ModuleConfigNavigatorItems.map(
            moduleConfigNavigatorItem => new ModuleConfigNavigatorItem(moduleConfigNavigatorItem)
        );
    }
}
