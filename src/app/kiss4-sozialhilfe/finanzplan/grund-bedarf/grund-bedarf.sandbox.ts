import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import { Subscription } from 'rxjs/rx';
import { LoadFormDataQueryModel, StatusCodeQuery, UpdateFormDataQueryModel } from './models';
import * as grundBedarfStore from './store';
import * as GrundBedarfAction from './store/actions/grund-bedarf.action';


@Injectable()
export class GrundBedarfSandbox extends Sandbox {
  // Get data for DPL select box
  public GetDataSourceSelectboxData$ = this.grundBedarfState$.select(
    grundBedarfStore.getBerechnungsgrundlageSelectBoxData
  );
  // Load Form Data
  public LoadGrundBedarfFormData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfFormData
  );
  // Update Form Data
  public UpdateGrundBedarfFormData$ = this.grundBedarfState$.select(
    grundBedarfStore.getGrundBedarfUpdateFormData
  );
  // Load status code Data
  public LoadStatusCodeData$ = this.grundBedarfState$.select(
    grundBedarfStore.getStatusCodeData
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private grundBedarfState$: Store<grundBedarfStore.GrundBedarfState>
  ) {
    super(appState$);
  }

  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  // get DPL select box data
  public loadSelectboxData(): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.LoadDataSourceSelectboxData.LoadDataSourceSelectboxDataAction());
  }
  // get Form data
  public loadGrundBedarfFormData(formDataModelQuery?: LoadFormDataQueryModel): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfFormData.LoadGrundBedarfFormDataAction(formDataModelQuery));
  }
  // Update Form data
  public updateFormData(model: UpdateFormDataQueryModel): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.GrundBedarfUpdateFormData.UpdateGrundBedarfFormDataAction(model));
  }
  // get Status code data
  public loadStatusCodeData(statusCodeModelQuery?: StatusCodeQuery): void {
    this.grundBedarfState$.dispatch(new GrundBedarfAction.LoadStatusCodeData.LoadStatusCodeDataAction(statusCodeModelQuery));
  }
}
