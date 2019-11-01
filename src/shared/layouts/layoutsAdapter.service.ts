import { Injectable } from '@angular/core';
import { MenuModel, TopMenuItem } from '@shared/models';

@Injectable()
export class LayoutsAdapterService {
    /**
     * Transforms grid data itemMENU recieved from the API into array of 'api/menuitem/loadtopmenuitems' instances
     *
     * @param trees
     */
    static getTopMenuItemsAdapter(menus: TopMenuItem[]): Array<any> {
        return menus.map(item => {
            const menuModel: MenuModel = {
                id: item.menuItemId,
                name: item.caption,
                url: ``,
                items: [],
            };
            return menuModel;
        });
    }

     /**
     * Transforms grid data itemMENU recieved from the API into array of 'api/menuitem/loadtopmenuitems' instances
     *
     * @param trees
     */
    static getSubMenuitemsAdapter(menus: TopMenuItem[]): Array<any> {
        return menus.map(item => {
            const menuModel: MenuModel = {
                id: item.menuItemId,
                parentID: item.parentMenuItemID,
                name: item.caption,
                countedSubItems: item.countedSubItems,
                url: `/app/menu_${item.menuItemId}`,
                items: []
            };
            return menuModel;
        });
    }
}
