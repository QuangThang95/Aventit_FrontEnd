import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilService } from '@shared/utilites/utility.service';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as pendenzenVerwaltungsAction from './store/actions/pendenzens.actions';
import * as store from '@shared/store';
import * as pendenzenStore from './store';
import {
  PendenzenVerwaltung,
  LovCodeQuery,
  PendenzenVerwaltungQuery
} from './models';
import { User } from '@shared/models';
import { PendenzenConstants } from '@shared/common/pendenzen.common';

@Injectable()
export class PendenzensSandbox extends Sandbox {
  public pendenzenVerwaltungsData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungsData
  );
  public pendenzenVerwaltungLoading$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungsLoading
  );
  public pendenzenVerwaltung$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltung
  );
  public pendenzenVerwaltungAdding$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungAdding
  );
  public pendenzenVerwaltungQuery$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungQuery
  );

  public pendenzenVerwaltungStatusData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungStatusData
  );

  public pendenzenVerwaltungTypeData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungTypeData
  );

  public pendenzenVerwaltungOrganisationData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungOrganisationData
  );

  public pendenzenVerwaltungLeistungsverantData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungLeistungsverantData
  );

  public pendenzenVerwaltungLeistungsverantwData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungLeistungsverantwData
  );

  public pendenzenVerwaltungErstellerEmpfaengerData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungErstellerEmpfaengerData
  );

  public pendenzenVerwaltungLeistungData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungLeistungData
  );

  public pendenzenVerwaltungFalltraegerData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungFalltraegerData
  );

  public pendenzenVerwaltungBetriffPersonData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungBetriffPersonData
  );

  public pendenzenVerwaltungBetreffBeschreibungData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungBetreffBeschreibungData
  );

  public pendenzenVerwaltungInitData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungInitData
  );

  public pendenzenVerwaltungModulenStatusData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungModulenStatusData
  );

  public pendenzenVerwaltungStatusEditData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungStatusEditData
  );

  public pendenzenVerwaltungErfassungMutationData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungErfassungMutationData
  );

  public pendenzenVerwaltungTreeNavigatorData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungTreesData
  );

  public pendenzenVerwaltungGetMasterData$ = this.pendenzenState$.select(
    pendenzenStore.getPendenzenVerwaltungGetMasterData
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private pendenzenState$: Store<pendenzenStore.PendenzenState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  /**
   * Loads pendenzenVerwaltungs from the server
   */
  public loadPendenzenVerwaltungs(params?: any): void {
    this.pendenzenState$.dispatch(new pendenzenVerwaltungsAction.PendenzenVerwaltungAction.LoadAction(params));
  }

    /**
   * Get pendenzenVerwaltungs from the server
   */
  public loadPendenzenVerwaltungsGetMaster(): void {
    this.pendenzenState$.dispatch(new pendenzenVerwaltungsAction.PendenzenVerwaltungGetMasterAction.LoadAction());
  }

  // ADD NEW
  public createPendenzenVerwaltung(
    pendenzenVerwaltung: PendenzenVerwaltung
  ): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungInsertAction.AddNewAction(
        new PendenzenVerwaltung(pendenzenVerwaltung)
      )
    );
  }

  public updatePendenzenVerwaltung(
    pendenzenVerwaltung: PendenzenVerwaltung
  ): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungUpdateAction.UpdateAction(
        new PendenzenVerwaltung(pendenzenVerwaltung)
      )
    );
  }

  public notifyMessage(
    messageTranslationCode: string,
    type: string = 'info',
    titleTranslationCode?: string
  ): any {
    this.utilService.displayNotification(
      messageTranslationCode,
      type,
      titleTranslationCode
    );
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  public registerEvents(): void {
    const query = new LovCodeQuery();
    const queryData = new PendenzenVerwaltungQuery();
    queryData.NavBarItemName = 'itmMeineOffen';

    query.lovName = 'TaskStatus';
    query.isSuchenTaskCode = true;

    this.subscriptions.push(
      this.loggedUser$.subscribe((user: User) => {
        if (user.isLoggedIn) {
          // this.loadPendenzenVerwaltungs(queryData);
          // this.loadPendenzenVerwaltungOrganisation();
          // this.loadPendenzenVerwaltungType(PendenzenConstants.TaskType);
          // this.loadPendenzenVerwaltungStatus(query);
          // this.loadPendenzenVerwaltungLeistungsverant(
          //   PendenzenConstants.Keyword
          // );
          // this.loadPendenzenVerwaltungErstellerEmpfaenger(
          //   PendenzenConstants.Keyword
          // );
          // this.loadPendenzenVerwaltungFalltraeger(PendenzenConstants.Keyword);
          // this.loadPendenzenVerwaltungTreeNavigator();
          this.loadPendenzenVerwaltungsGetMaster();
        } else {
          this.unregisterEvents();
          this.clearStore();
        }
      })
    );
  }

  /**
   * Clear store for sandbox pendenzen
   */
  private clearStore() {
    pendenzenStore.getPendenzenVerwaltungsData.release();
    pendenzenStore.getPendenzenVerwaltungsLoading.release();
    pendenzenStore.getPendenzenVerwaltung.release();
    pendenzenStore.getPendenzenVerwaltungAdding.release();
    pendenzenStore.getPendenzenVerwaltungQuery.release();
    pendenzenStore.getPendenzenVerwaltungStatusData.release();
    pendenzenStore.getPendenzenVerwaltungTypeData.release();
    pendenzenStore.getPendenzenVerwaltungOrganisationData.release();
    pendenzenStore.getPendenzenVerwaltungLeistungsverantData.release();
    pendenzenStore.getPendenzenVerwaltungLeistungsverantwData.release();
    pendenzenStore.getPendenzenVerwaltungErstellerEmpfaengerData.release();
    pendenzenStore.getPendenzenVerwaltungLeistungData.release();
    pendenzenStore.getPendenzenVerwaltungFalltraegerData.release();
    pendenzenStore.getPendenzenVerwaltungBetriffPersonData.release();
    pendenzenStore.getPendenzenVerwaltungBetreffBeschreibungData.release();
    pendenzenStore.getPendenzenVerwaltungInitData.release();
    pendenzenStore.getPendenzenVerwaltungModulenStatusData.release();
    pendenzenStore.getPendenzenVerwaltungStatusEditData.release();
    pendenzenStore.getPendenzenVerwaltungErfassungMutationData.release();
    pendenzenStore.getPendenzenVerwaltungTreesData.release();
  }

  /**
   * Loads Pendenzen Verwaltung status from the server
   */
  public loadPendenzenVerwaltungStatus(query: LovCodeQuery): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenStatusAction.LoadAction(query)
    );
  }

  /**
   * Loads Pendenzen Verwaltung type from the server
   */
  public loadPendenzenVerwaltungType(lovName: string): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenWithTypeAction.LoadAction(lovName)
    );
  }

  /**
   * Loads Pendenzen Verwaltung Organisation from the server
   */
  public loadPendenzenVerwaltungOrganisation(): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenOrganisationAction.LoadAction()
    );
  }

  /**
   * Loads Pendenzen Verwaltung Leistungsverant from the server
   */
  public loadPendenzenVerwaltungLeistungsverant(keyword: string): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenLeistungsverantwsAction.LoadAction(keyword)
    );
  }

  /**
   * Loads Pendenzen Verwaltung Leistungsverantw from the server
   */
  public loadPendenzenVerwaltungLeistungsverantw(keyword: string): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenLeistungsverantwAction.LoadAction(keyword)
    );
  }

  /**
   * Loads Pendenzen Verwaltung ErstellerEmpfaenger from the server
   */
  public loadPendenzenVerwaltungErstellerEmpfaenger(keyword: string): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenErstellerEmpfaengerAction.LoadAction(keyword)
    );
  }

  /**
   * Loads Pendenzen Verwaltung Leistung from the server
   */
  public loadPendenzenVerwaltungLeistung(faFallId: number): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenLeistungsAction.LoadAction(faFallId)
    );
  }

  /**
   * Loads Pendenzen Verwaltung Falltraeger from the server
   */
  public loadPendenzenVerwaltungFalltraeger(keyword: string): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungFalltraegersAction.LoadAction(keyword)
    );
  }

  /**
   * Loads Pendenzen Verwaltung BetriffPerson from the server
   */
  public loadPendenzenVerwaltungBetriffPerson(faFallId: number): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenBetriffPersonsAction.LoadAction(faFallId)
    );
  }

  /**
   * Loads Pendenzen Verwaltung BetriffPerson from the server
   */
  public loadPendenzenVerwaltungBetreffBeschreibung(
    taskTypeCode: number
  ): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenBetreffBeschreibungs.LoadAction(taskTypeCode)
    );
  }

  /**
   * Loads Pendenzen Verwaltung InitData from the server
   */
  public loadPendenzenVerwaltungInitData(fallId?: number): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenInitDatas.LoadAction(fallId)
    );
  }

  /**
   * Loads Pendenzen Verwaltung ModulenStatus from the server
   */
  public loadPendenzenVerwaltungModulenStatus(baPersonId: number): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungModulenStatusAction.LoadAction(baPersonId)
    );
  }

  /**
   * Loads Pendenzen Verwaltung Status Edit from the server
   */
  public loadPendenzenVerwaltungStatusEdit(taskId: number): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungStatusEditAction.LoadAction(taskId)
    );
  }

  /**
   * Loads Pendenzen Verwaltung Erfassung Mutation from the server
   */
  public loadPendenzenVerwaltungErfassungMutation(params: any): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungErfassungMutationAction.LoadAction(params)
    );
  }

  /**
   * Loads Pendenzen Verwaltung TreeNavigator from the server
   */
  public loadPendenzenVerwaltungTreeNavigator(): void {
    this.pendenzenState$.dispatch(
      new pendenzenVerwaltungsAction.PendenzenVerwaltungNavTreeAction.LoadAction()
    );
  }
}
