import { Injectable } from '@angular/core';
import { Adapter, DefaultHeaders, GET, HttpService, Path, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';
import { UberService } from './uber.service';


@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})

export class UberApiClient extends HttpService {

    @GET('api/GetCultureInfo?LanguageCode={query}')
    @ViewCatcher()
    @Adapter(UberService.GetCultureInfo)
    public getCultureInfo(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('/api/v1/Main/About/DatabaseInfo')
    @ViewCatcher()
    @Adapter(UberService.GetDatabaseInfo)
    public getDatabaseInfo(): Observable<any> {
        return null;
    }

    @GET('api/v1/Main/About/DatabaseVersions')
    @ViewCatcher()
    @Adapter(UberService.GetDatabaseVersions)
    public getDatabaseVersions(): Observable<any> {
        return null;
    }

    @GET('api/v1/Main/About/Kiss4WebVersion')
    @ViewCatcher()
    @Adapter(UberService.GetKiss4WebVersion)
    public getKiss4WebVersion(): Observable<any> {
        return null;
    }
}
