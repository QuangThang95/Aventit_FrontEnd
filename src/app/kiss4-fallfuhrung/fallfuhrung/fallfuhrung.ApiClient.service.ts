import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, GET, HttpService, Path, POST, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { FallfuhrungService } from './fallfuhrung.service';
import { ModelQueryUpdateFaleistung, ModelQueryValidationFaLeistung } from './models/fallfuhrung.model';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class FallfuhrungApiClient extends HttpService {

    // Load Fallfuhrung
    @GET('api/Fallfuehrung/GetFaLeistungByFaLeistungID?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getDataFallfuhrung)
    public getDataFallfuhrung(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Load Config
    @GET('api/Fallfuehrung/GetConfigBool{query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getConfigAdapter)
    public getConfig(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Load FallRights
    @GET('api/Fallfuehrung/GetFallRights?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getFallRightsAdapter)
    public getDataFallRights(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Load Data Combobox
    @GET('api/Fallfuehrung/GetLOVName?LOVName={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getDataCbboxAdapter)
    public getDataCombobox(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Update FaLeistung
    @POST('api/Fallfuehrung/UpdateFaLeistungTransaction')
    @ViewCatcher()
    @Adapter(FallfuhrungService.updateFaLeistungAdapter)
    public updateFaLeistungTransaction(@Body modelFaleistung: ModelQueryUpdateFaleistung): Observable<any> {
        return null;
    }

    // Load AnzahlOffene Pendenzen
    @GET('api/Fallfuehrung/GetAnzahlOffenePendenzen?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(FallfuhrungService.getAnzahlOffenePendenzenAdapter)
    public getAnzahlOffenePendenzen(@Path('query') query: any): Observable<any> {
        return null;
    }

    // Validation FaLeistung
    @POST('api/Fallfuehrung/ValidationFaLeistung')
    @ViewCatcher()
    @Adapter(FallfuhrungService.validationFaLeistungAdapter)
    public validationFaLeistung(@Body modelValidationFaLeistung: ModelQueryValidationFaLeistung): Observable<any> {
        return null;
    }
}
