import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
// rxjs
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError, flatMap } from 'rxjs/operators';
//
import * as actions from '../actions/layout.actions';
import { LayoutsApiClientServices } from '@shared/layouts/layoutsApiClient.services';
import { Observable } from 'rxjs/Observable';
import { pipe } from '../../../../node_modules/rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as store from '../../store';
import { Router } from '@angular/router';
import { parseMenuItems } from '@shared/utilites/utilityHelpers';

@Injectable()
export class LayoutEffects {

  constructor(
    private router: Router,
    private appState$: Store<store.State>,
    private actions$: Actions,
    private layoutsApiClient: LayoutsApiClientServices) { }

  /**
   * Load Search box Action
   */
  @Effect()
  getSearchBoxDatas$ =
    this.actions$.ofType(actions.LayoutActionTypes.LoadSearchBox.LOAD).pipe(
      map((action: actions.LoadSearchBoxDataAction) => action.payload),
      switchMap((state) => {
        return this.layoutsApiClient.LoadSearchBoxDatas().pipe(
          map(datas => new actions.LoadSearchBoxDataSuccessAction(datas)),
          catchError(error => of(new actions.LoadSearchBoxDataFailAction()))
        );
      })
    );

  /**
  * Load Menus data Action
  */

  @Effect()
  getMenus$ = this.actions$.ofType(actions.LayoutActionTypes.LoadMenu.LOAD).pipe(
    map((action: actions.LoadMenuAction) => action.payload),
    switchMap(() => {
      return this.layoutsApiClient.LoadTopMenuItems().pipe(
        map((items: any[]) => {
          const observables = new Array();
          const observablesl1 = new Array();
          const observablesl2 = new Array();
          // map
          for (const item of items) {
            observables.push(this.layoutsApiClient
              .LoadSubMenuItems(item.id)
              .toPromise());
          }

          const promiseRunAll = () => {
            return Promise.all(observables);
          };

          promiseRunAll().then(subs => {
            for (let i = 0; i < items.length; i++) {
              items[i].items = subs[i];
              for (let j = 0; j < items[i].items.length; j++) {
                if (items[i].items[j].countedSubItems !== undefined) {
                  observablesl1.push(this.layoutsApiClient
                    .LoadSubMenuItems(items[i].items[j].id)
                    .toPromise());
                }
              }
            }
            const promiseRunAll1 = () => {
              return Promise.all(observablesl1);
            };
            promiseRunAll1().then(subs1 => {
              for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < items[i].items.length; j++) {
                  for (let z = 0; z < subs1.length; z++) {
                    // console.log(items[i].items[j].id, 'id');
                    // console.log(subs1[z][0].parentID, 'parentID');
                    if (subs1[z].length > 0 && items[i].items[j].id === subs1[z][0].parentID) {
                      items[i].items[j].items = subs1[z];
                    }
                  }
                }
              }
              items = parseMenuItems(items.slice(0, 3));
              this.appState$.dispatch(new actions.LoadMenuSuccessAction(items));
            });
          });
          return new actions.LoadMenuSuccessAction(items);
        }),
        catchError(error => of(new actions.LoadMenuFailAction(error)))
      );
    }));
}
