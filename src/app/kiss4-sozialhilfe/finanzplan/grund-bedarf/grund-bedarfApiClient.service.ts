import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';
import { GrundBedarfService } from './grund-bedarf.service';
import { UpdateFormDataQueryModel } from './models';




@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class GrundBedarfApiClient extends HttpService {

    // Load Berechnungsgrundlage select box data
    @GET('api/Fallfuehrung/GetDPLData')
    @ViewCatcher()
    @Adapter(GrundBedarfService.getBerechnungsgrundlageSelcectboxDataAdapter)
    public getSelectboxDatas(): Observable<any> {
        return null;
    }
    // Load Form data
    @GET('api/Fallfuehrung/LoadFaPhaseData{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.loadFormDataAdapter)
    public loadGrundBedarfFormData(@Path('query') query: string): Observable<any> {
        return null;
    }
    // Update from data
    @PUT('api/Fallfuehrung/UpdateFaPhase')
    @ViewCatcher()
    @Adapter(GrundBedarfService.updateFormDataAdapter)
    public updateFormData(
        @Body data: UpdateFormDataQueryModel): Observable<any> {
        return null;
    }
    @GET('api/v1/Sozialhilfe/WhPersonen/Header{query}')
    @ViewCatcher()
    @Adapter(GrundBedarfService.getStatusCodeDataAdapter)
    getStatusCodeDatas(@Path('query') query: string): Observable<any> {
        return null;
    }
}
