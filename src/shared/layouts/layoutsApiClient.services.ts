import { LayoutsAdapterService } from './layoutsAdapter.service';
import { HttpService } from './../asyncServices/http/http.service';
import { Injectable, Query } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MenuDatas, SearchBoxDatas } from '@shared/mocks';
import { DefaultHeaders, Adapter, GET, Path } from '@shared/asyncServices/http';

@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
})
@Injectable()
export class LayoutsApiClientServices extends HttpService {

    /**
     * Load searchbox data from mocks
     */
    public LoadSearchBoxDatas(): Observable<any> {
        return of(SearchBoxDatas);
    }

    /**
     * Load Top Menu horizontal data from api 'api/menuitem/loadtopmenuitems'
     */
    @GET('api/menuitem/loadtopmenuitems')
    @Adapter(LayoutsAdapterService.getTopMenuItemsAdapter)
    public LoadTopMenuItems(): Observable<any> {
        return null;
    }

    /**
     * Load Menu horizontal data from api 'api/menuitem/loadmenuitems?ParentMenuItemId={query}'
     */
    @GET('api/menuitem/loadmenuitems?ParentMenuItemId={query}')
    @Adapter(LayoutsAdapterService.getSubMenuitemsAdapter)
    public LoadSubMenuItems(@Path('query') ParentMenuItemId?: any): Observable<any> {
        return null;
    }
}
