import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as actions from '../actions/module-config-navigator.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ModuleConfigApiClient } from '../../module-configApiClient.service';
import { ModuleConfigNavigatorItem, ModuleConfigNavigatorItemsQuery } from '../../models';
import { tryMapPathApi } from '@shared/utilites';

@Injectable()
export class ModuleConfigNavigatorEffects {
    constructor(private actions$: Actions, private moduleConfigApiClient: ModuleConfigApiClient) { }

    @Effect()
    getGetModuleConfigNavigatorItems$ = this.actions$
        .ofType(actions.ModuleConfigNavigatorActionTypes.ModuleConfigNavigatorItemsTypes.LOAD)
        .pipe(
            map((action: actions.ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsAction) => action.payload),
            switchMap((state: ModuleConfigNavigatorItemsQuery) => {
                // const query = tryMapPathApi(state);
                const query = state.ClassName;
                return this.moduleConfigApiClient
                    .getModuleConfigNavigatorItems(query).pipe(
                        map(
                            data =>
                                new actions.ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsSuccessAction(data)
                        ),
                        catchError(error =>
                            of(new actions.ModuleConfigNavigatorItems.LoadModuleConfigNavigatorItemsFailAction(error))
                        ));
            })
        );
}
