import { Injectable } from '@angular/core';
import { DefaultHeaders, HttpService, GET, Adapter, Path } from '@shared/asyncServices/http';
import { Observable } from 'rxjs';
import { ModuleConfigService } from './module-config.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class ModuleConfigApiClient extends HttpService {
    @GET('api/v1/Common/LeftMenu/{query}')
    @Adapter(ModuleConfigService.getModuleConfigNavigatorItemsAdapter)
    public getModuleConfigNavigatorItems(@Path('query') query: any): Observable<any> {
        return null;
    }
}
