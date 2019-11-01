import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';
import { VermogenService } from './vermogen.service';




@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class VermogenApiClient extends HttpService {

    // Load Person select box data
    @GET('api/Fallfuehrung/GetDPLData')
    @ViewCatcher()
    @Adapter(VermogenService.getPersonSelectboxDataAdapter)
    public getSelectboxDatas(): Observable<any> {
        return null;
    }

}
