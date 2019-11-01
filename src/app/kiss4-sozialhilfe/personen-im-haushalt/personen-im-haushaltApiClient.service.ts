import {
  Adapter,
  Body,
  DefaultHeaders,
  GET,
  HttpService,
  Path,
  POST,
  PUT
} from '@shared/asyncServices/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonenImHaushaltService } from './personen-im-haushalt.service';
import { IPersonenImHaushalt, IWhKennzahlen, IKlientenSystem } from './models';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class PersonenImHaushaltApiClient extends HttpService {
  /**
   * Retrieves all personen-im-haushalt
   * @param query
   */
  @GET('api/v1/Sozialhilfe/WhPersonen/Header{query}')
  @Adapter(PersonenImHaushaltService.headerAdapter)
  getHeader(@Path('query') query: string): Observable<IPersonenImHaushalt> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/WhPersonen/WhKennzahlen{query}')
  @Adapter(PersonenImHaushaltService.whKennzahlenAdapter)
  getWhKennzahlen(@Path('query') query: string): Observable<IWhKennzahlen> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/WhPersonen/Klientensystem{query}')
  @Adapter(PersonenImHaushaltService.klientensystemAdapter)
  getKlientenSystem(@Path('query') query: string): Observable<IKlientenSystem> {
    return null;
  }
  @GET('api/v1/Sozialhilfe/WhPersonen/Haushalt{query}')
  @Adapter(PersonenImHaushaltService.haushaltAdapter)
  getHaushalt(@Path('query') query: any): Observable<any> {
    return null;
  }
  @POST('api/v1/Sozialhilfe/WhPersonen/SaveWhPersonen')
  @Adapter(PersonenImHaushaltService.saveWhPersonenAdapter)
  putPersonenImHaushalt(@Body body: any): Observable<any> {
    return null;
  }
}
