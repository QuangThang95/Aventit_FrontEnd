import { DocumentsHelper } from './doc-helper';
import { DocumentGenerationComponent } from './document-generation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * How use
 * app-document-generation
 * @requires
 * ```
 * Import { DocumentGenerationModule } from 'document-generation.module';
 * ```
 **/
/**
 * @example use in component
 *  <!-- button document -->
    <app-document-generation [displayText]="'word'" [templateId]="'669164'"
      [contextValues]="[{ Name: 'FaAktennotizID', Value: '17' }, { Name: 'BaPersonID', Value: '64820' }]"
      (onClickEvent)="onDocumentCreate($event)">
    </app-document-generation>
 */

/**
 * @example ts component
   onDocumentCreate(e) {
     this.documentSandbox.postDocumentCreate(e);
     this.documentSandbox.xDocument$.subscribe(document => {
       if (!document) return;
       this._document.downloadFile(document.fileBinary, document.docFormatCode, document.docTemplateName);
     });
   }
 */

/**
 * @example Document sandbox
 *  public postDocumentCreate(payload: any) {
 *    this.documentState$.dispatch(new documentsActions.DocumentCreate(payload));
 *  }
 */

/**
 * @example Document Actions
  // Actions Type:
  DOCUMENT_CREATE: type('[Document create action] call'),
  DOCUMENT_CREATE_SUCCESS: type('[Document create action] Success'),
  DOCUMENT_CREATE_ERROR: type('[Document create action] Error')
  // DOCUMENT CREATE FEATURE
  export class DocumentCreate implements Action {
    type = ActionTypes.DOCUMENT_CREATE;
    constructor(public payload: any = null) { };
  }

  export class DocumentCreateSuccess implements Action {
    type = ActionTypes.DOCUMENT_CREATE_SUCCESS;
    constructor(public payload: any = null) { };
  }

  export class DocumentCreateError implements Action {
    type = ActionTypes.DOCUMENT_CREATE;
    constructor(public payload: any = null) { };
  }
**/
/**
 * @example "Document reducers"
  - State:
  stateDocumentCreated: Pick<any, any>;
  - Reducer function:
  case documents.ActionTypes.DOCUMENT_CREATE: {
    return Object.assign({}, state, {
      stateDocumentCreated: action.payload,
    });
  }

  case documents.ActionTypes.DOCUMENT_CREATE_SUCCESS: {
    return Object.assign({}, state, {
      stateDocumentCreated: action.payload
    });
  }

  case documents.ActionTypes.DOCUMENT_CREATE_ERROR: {
    return Object.assign({}, state, {
      stateDocumentCreated: action.payload
    });
  }
**/
/**
 * @example Document effects
  getDocument$: Observable<Action> = this.actions$
    .ofType(documentsAction.ActionTypes.DOCUMENT_CREATE)
    .map((action: documentsAction.DocumentCreate) => action.payload)
    .switchMap((state: any) => {
      return this.documentApiClient.DocumentCreate(state.templateId, state.contextValues)
        .map(document => new documentsAction.DocumentCreateSuccess(document))
        .catch(error => Observable.of(new documentsAction.DocumentCreateError()));
    })
 **/
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DocumentGenerationComponent
  ],
  exports: [
    DocumentGenerationComponent
  ],
  providers: [DocumentsHelper]
})
export class DocumentGenerationModule { }
