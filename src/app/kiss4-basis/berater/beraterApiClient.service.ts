import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Adapter, Body, HttpService, DefaultHeaders, GET, Path, POST, PUT, DELETE, ViewCatcher } from '@shared/asyncServices/http';
import { BeraterService } from './berater.service';
import { PostKontakt } from './models';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})

export class BeraterApiClient extends HttpService {
  /**
   * get data berater
   */
  @POST('api/v1/basis/RavBerater/kontakt')
  @ViewCatcher()
  @Adapter(BeraterService.gridAdapter)
  public getBerater(@Body query: any): Observable<any> {
    return null;
  }

  // VDHoan start api client
  @GET('api/Basis/GetKontakt{query}')
  @ViewCatcher()
  @Adapter(BeraterService.getKontakt)
  public getKontakt(@Path('query') query: string): Observable<any> {
    return null;
  }

  @GET('api/v1/basis/RavBerater/institution{query}')
  @ViewCatcher()
  @Adapter(BeraterService.getInstitution)
  public getInstitution(@Path('query') query: any): Observable<any> {
    return null;
  }

  @GET('api/lookups/Sprache')
  @ViewCatcher()
  @Adapter(BeraterService.getLanguage)
  public getLanguage(): Observable<any> {
    return null;
  }

  @POST('api/v1/basis/RavBerater/BaInstitutionKontakt')
  @ViewCatcher()
  @Adapter(BeraterService.saveBaInstitutionKontakt)
  public saveBaInstitutionKontakt(@Body postKontakt: PostKontakt): Observable<any> {
    return null;
  }

  @DELETE('api/v1/basis/RavBerater/BaInstitutionKontakt')
  @ViewCatcher()
  @Adapter(BeraterService.saveBaInstitutionKontakt)
  public deleteBaInstitutionKontakt(@Body query: any): Observable<any> {
    return null;
  }
  // VDHoan end api client
}
