import { Injectable } from '@angular/core';
import { Adapter, Body, DefaultHeaders, DELETE, GET, HttpService, Path, POST, PUT, ViewCatcher } from '@shared/asyncServices/http';
import { Observable } from 'rxjs/Observable';

import { VorlagenProfileService } from './vorlagenProfile.service';

@Injectable()
@DefaultHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
export class VorlagenProfileApiClient extends HttpService {
    /**
     * Retrieves all VorlagenProfile
     */
    @GET('api/Administration/Profiles{query}')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.gridAdapter)
    public getVorlagenProfile(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/Administration/XProfileTagID{query}')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.getXProfileTagIDAdapter)
    public getXProfileTagID(@Path('query') query: any): Observable<any> {
        return null;
    }

    @GET('api/Administration/XProfileID{query}')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.getXProfileIDAdapter)
    public getXProfileID(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/Administration/Profile{query}')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.deleteXProfileAdapter)
    public deleteXProfile(@Path('query') query: any): Observable<any> {
        return null;
    }

    @DELETE('api/Administration/DeleteXProfile_XProfileTag')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.deleteXProfile_XProfileTagAdapter)
    public deleteXProfileXProfileTag(@Body xProfile: any): Observable<any> {
        return null;
    }

    @POST('api/Administration/Profile')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.insertXProfileAdapter)
    public insertXProfile(@Body xProfile: any): Observable<any> {
        return null;
    }

    @PUT('api/Administration/Profile')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.updateXProfileAdapter)
    public updateXProfile(@Body xProfile: any): Observable<any> {
        return null;
    }

    @GET('api/Administration/GetCurrentTID{query}')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.getCurrentTIDAdapter)
    public getCurrentTID(@Path('query') query: any): Observable<any> {
        return null;
    }

    @POST('api/Administration/SaveXLangText')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.saveXLangTextAdapter)
    public saveXLangText(@Body xProfile: any): Observable<any> {
        return null;
    }

    @POST('api/Administration/ProfileTags')
    @ViewCatcher()
    @Adapter(VorlagenProfileService.execspXSaveProfileTagsAdapter)
    public execspXSaveProfileTags(@Body xProfile: any): Observable<any> {
        return null;
    }
}
