import { Injectable } from '@angular/core';
import {
    DefaultHeaders,
    HttpService,
} from '@shared/asyncServices/http';


@Injectable()
export class VorlagenverwaltungApiClient extends HttpService {}

@Injectable()
@DefaultHeaders({
    Accept: '*',
    'Content-Type': 'multipart/form-data'
})
export class VorlagenverwaltungUploadApiClient extends HttpService {}
