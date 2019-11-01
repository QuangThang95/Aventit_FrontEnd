import { FallNavNavigatorTreeModel as TreesModel } from './models';
import { Injectable } from '@angular/core';
import { FallHeaderModel } from '@app/kiss4-main/fall-navigator/models/fall-header';

@Injectable()
export class FallNavService {
    /**
     * Transforms grid data trees recieved from the API into array of 'FallNavNavigatorTreeModel' instances
     *
     * @param trees
     */
    static gridAdapter(trees: any): Array<any> {
        if (trees) {
            if (trees[0].type === 'E') {
                trees[0].parentId = '0';
            }
        }
        return trees.map(tree => new TreesModel(tree));
    }

    /**
     * Get config value to show or hide Kategory checkbox
     * @param configBools
     */
    static configBoolAdapter(configBools: any): boolean {
        return (configBools.value === true) ? true : false;
    }

    /**
     * Get headers column
     * @param headers
     */
    static fallHeaderAdapter(headers: any): Array<any> {
        return headers.map(
            header => new FallHeaderModel(header));
    }
}
