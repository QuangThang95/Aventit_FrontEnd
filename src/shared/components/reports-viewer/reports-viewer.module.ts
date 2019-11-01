import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from './report.service';

import { ReportsComponent } from './reports.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';

/**
 * How use
 * app-reports, app-report-viewer
 * @requires
 * ```
 * Import { ReportsViewerModule } from 'reports-viewer.module';
 * ```
 **/
/**
 * @example use in component
 * @param reportDataJSON is JSON
 * @example
 * <app-report-viewer [displayText]="'report'" [queryName]="'nameReport'" [contextValues]="[
    {'Name': 'BaPersonID', 'Value': '64820'},
    {'Name': 'Person', 'Value': '2323'},
    {'Name': 'Zeitraum', 'Value': 1},
    {'Name': 'LaList', 'Value': 'Testing'},
    {'Name': 'DatumVon', 'Value': 'Fri Sep 07 2018 08:40:11 GMT+0700 (SE Asia Standard Time)'},
    {'Name': 'DatumBis', 'Value': 'Wed May 30 2018 08:40:11 GMT+0700 (SE Asia Standard Time)'},
    {'Name': 'Verdichtet', 'Value': true },
    {'Name': 'BetraegeAnpassen', 'Value': true },
    {'Name': 'FaLeistungID', 'Value': 54654 }
    ]"
    (onClickEvent)="onReportViewer($event)">
      <app-reports [viewerModel]="reportSandBox.reportViewData$ | async">
      </app-reports>
  </app-report-viewer>
 */

/**
 * @example implement onReportViewer fumtion
   onReportViewer(e) {
     this.reportsSandbox.getReport(e);
     this.reportsSandbox.reportViewData$.subscribe(report => {
       if (!report) return;
       // implement code here
     });
   }
 */

/**
 * @example implement Reports sandbox
 *  public getReport(payload?: any) {
 *    this.reportsState$.dispatch(new reportsActions.getReports(payload));
 *  }
 */

/**
 * @example implement Reports Actions
  // Actions Type:
  const reportActionTypes = {
    GET_REPORT: type('[Get reports action] Loading'),
    GET_REPORT_FAIL: type('[Get reports action] Failed'),
    GET_REPORT_SUCCESS: type('[Get reports action] Data success')
  }

  // Class action
  export class GetReportAction implements Action {
    type = ActionTypes.GET_REPORT;
    constructor(public payload?: any) { };
  }

  export class GetReportSuccess implements Action {
    type = ActionTypes.GET_REPORT_SUCCESS;
    constructor(public payload?: any) { };
  }

  export class GetReportFail implements Action {
    type = ActionTypes.GET_REPORT_SUCCESS;
    constructor(public payload?: any) { };
  }
**/
/**
 * @example implement report reducers
  - State:
  interface reportState {
    loading: boolean;
    loaded: boolean;
    failed: boolean;
    reportViewData: any;
  }
  - Init State
  const initReportState: reportState = {
    loading: false,
    loaded: false,
    failed: false,
    reportViewData: null
  }
  - Reducer function:
  import * fromReportsAction from './actions/reports.actions';

  case fromReportsAction.reportActionTypes.GET_REPORT: {
    return {
      ...state,
      loading: true
    };
  }

  case fromReportsAction.reportActionTypes.GET_REPORT_SUCCESS: {
   return {
     ...state,
     loading: false,
     loaded: true,
     reportViewData: action.payload
   };
  }

  case fromReportsAction.reportActionTypes.GET_REPORT_FAIL: {
    return {
      ...state,
      loading: false,
      loaded: true,
      failed: true,
      reportViewData: null
    };
  }
**/
/**
 * @example Report effects
  getReport$: Observable<Action> = this.actions$
    .ofType(fromReportsAction.reportActionTypes.GET_REPORT)
    .map((action: fromReportsAction.GetReportAction) => action.payload)
    .switchMap((state: any) => {
      return this.reportApiClient.getReport(state)
        .map(reportData => new fromReportsAction.GetReportSuccess(reportData))
        .catch(error => Observable.of(new fromReportsAction.GetReportFail(error)));
    })
 **/
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ReportsComponent,
    ReportViewerComponent,
  ],
  exports: [
    ReportsComponent,
    ReportViewerComponent
  ],
  providers: [ReportService]
})
export class ReportsViewerModule { }
