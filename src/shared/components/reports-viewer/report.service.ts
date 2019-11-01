import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {
    constructor(private http: HttpClient) { }

    getReportViewer(url?: string): Observable<Pick<any, any>> {
        return this.http.get<Pick<any, any>>(url)
            .catch(this.errorHandler);
    }

    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error.message || 'Server Error');
    }
}
