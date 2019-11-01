import { Injectable } from '@angular/core';
import {
  Adapter,
  Body,
  DefaultHeaders,
  DELETE,
  GET,
  HttpService,
  Path,
  POST,
  ViewCatcher,
} from '@shared/asyncServices/http';
import { Observable } from 'rxjs';

import { TextmarkenService } from './basis-textmarken.service';
import { Basistextmarken } from './models';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
})

export class TextmarkenApiClient extends HttpService {
  @POST('api/Administration/XBookMarkList')
  @ViewCatcher()
  @Adapter(TextmarkenService.gridAdapterMarken)
  public getXBookMark(@Body query: any): Observable<any> {
    return null;
  }

  @GET('api/Administration/TabelleName')
  @ViewCatcher()
  @Adapter(TextmarkenService.gridAdapterMarken)
  public getTableBookMark(): Observable<any> {
    return null;
  }

  @GET('api/lookups/Bookmark')
  @ViewCatcher()
  @Adapter(TextmarkenService.gridAdapterMarken)
  public getTypBookMark(): Observable<any> {
    return null;
  }

  @GET('api/Administration/Module{query}')
  @ViewCatcher()
  @Adapter(TextmarkenService.gridAdapterMarken)
  public getModulBookMark(@Path('query') query: any): Observable<any> {
    return null;
  }

  @POST('api/Administration/XBookMark')
  @ViewCatcher()
  @Adapter(TextmarkenService.saveBasistextmarken)
  public saveBaInstitutionKontakt(@Body basistextmarken: Basistextmarken): Observable<any> {
    return null;
  }

  @DELETE('api/Administration/XBookMark')
  @ViewCatcher()
  @Adapter(TextmarkenService.deleteBasistextmarken)
  public deleteBaInstitutionBasistextmarken(@Body basistextmarken: Basistextmarken): Observable<any> {
    return null;
  }
}
