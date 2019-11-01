import {
  Adapter,
  Body,
  DefaultHeaders,
  GET,
  HttpService,
  Path,
  POST,
  PUT,
  DELETE,
  ViewCatcher
} from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArbeitService } from './arbeit.service';
@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class ArbeitApiClient extends HttpService {

  // Load baperson list
  @GET('api/Basis/Arbeit{query}')
  @ViewCatcher()
  @Adapter(ArbeitService.bapersonAdapter)
  public getArbeit(@Path('query') query: any): Observable<any> {
      return null;
  }

  @GET('api/lookups/{query}')
  @ViewCatcher()
  @Adapter(ArbeitService.lOVNameAdapter)
  public getLookups(@Path('query') query: any): Observable<any> {
      return null;
  }

  @GET('api/Basis/BerufSuchen{query}')
  @ViewCatcher()
  @Adapter(ArbeitService.berufSuchenAdapter)
  public getBerufSuchen(@Path('query') query: any): Observable<any> {
      return null;
  }

  @GET('api/Basis/InstitutionSuchenArbeit')
  @ViewCatcher()
  @Adapter(ArbeitService.institutionSuchenAdapter)
  public getInstitutionSuchenArbeit(): Observable<any> {
      return null;
  }

  @POST('api/Basis/Arbeit')
  @ViewCatcher()
  @Adapter(ArbeitService.saveAdapter)
  public saveArbeit(@Body barperson: any): Observable<any> {
      return null;
  }
}
