import { Action } from '@ngrx/store';

export interface AppStateAction<T = any> extends Action {
    payload?: T;
}

export interface ProcessState<T = boolean> {
    loading: T;
    loaded: T;
    failed: T;
}

interface AppDataState<V = any> {
    data?: V;
}

interface AppQueryState<V = any> {
    query?: V;
}

/**
 *
 * @description
 * interface AppEntityCustomState will create an model extends all properties
 * @typedef
 * ```
 * T typeOf AppDataState for data property
 * V typeOf AppQueryState for query property
 * V May or may not
 * ```
 * @name AppEntityCustomState
 */
export interface AppEntityCustomState<T = any, V = any> extends ProcessState<boolean>, AppDataState<T>, AppQueryState<V> { }
export interface AppEntityCustomState<T = any> extends ProcessState<boolean>, AppDataState<T> { }
