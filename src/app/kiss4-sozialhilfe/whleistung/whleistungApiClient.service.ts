import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { WhLeistungService } from './whleistung.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class WhLeistungApiClient extends HttpService {
    /**
     * get data Combobox
     */
    @GET('api/Fallfuehrung/GetLOVName?LOVName={query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.getDataCombobox)
    public getDataCombobx(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
    * get data top
    */
    @GET('api/Sozialhilfe/LeistungArea?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.getDataTop)
    public getDataTop(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * get bottom
     */
    @GET('api/Sozialhilfe/LeistungGrid?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.getDataGridBottom)
    public getDataGridBottom(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * count data
     */
    @GET('api/Sozialhilfe/LeistungGridTotalRow?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.getCountRecordData)
    public getCountRecordData(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
    * delete
    */
    @DELETE('api/Sozialhilfe/LeistungDelete{query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.deletetRecordData)
    public deletetRecordData(@Path('query') query: any): Observable<any> {
        return null;
    }

    /**
     * Update
     */
    @PUT('api/Sozialhilfe/LeistungUpdate')
    @ViewCatcher()
    @Adapter(WhLeistungService.updateData)
    public updateData(@Body data: any): Observable<any> {
        return null;
    }

    /**
     * Update Vorsaldo
     */
    @PUT('api/Sozialhilfe/VorsaldoUpdate')
    @ViewCatcher()
    @Adapter(WhLeistungService.updateVorsaldoData)
    public updateVorsaldoData(@Body data: any): Observable<any> {
        return null;
    }

    // getAnzahlOffenePendenzen
    @GET('api/Sozialhilfe/AnzahlOffenePendenzen?FaLeistungID={query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.getAnzahlOffenePendenzen)
    public getAnzahlOffenePendenzen(@Path('query') query: any): Observable<any> {
        return null;
    }

    // get VorsaldoKbKostenstelle
    @GET('api/Sozialhilfe/VorsaldoKbKostenstelleID?KbKostenstelleID={query}')
    @ViewCatcher()
    @Adapter(WhLeistungService.getVorsaldoKbKostenstelle)
    public getVorsaldoKbKostenstelle(@Path('query') query: any): Observable<any> {
        return null;
    }

     // getMLMessage
     @GET('api/Common/MLMessage{query}')
     @Adapter(WhLeistungService.getMLMessage)
     public getMLMessage(@Path('query') query: any): Observable<any> {
         return null;
     }
}
