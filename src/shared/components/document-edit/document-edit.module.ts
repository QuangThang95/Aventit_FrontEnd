import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentEditComponent } from './document-edit.component';

/**
 * How use
 * app-document-edit
 * @requires
 * ```
 * Import { * as ITHIT } required("../ITHitClient.js");
 * or declare var ITHit: any;
 * Import { DocumentEditModule } from 'document-edit.module';
 * ```
 **/
/**
 * @example use in component
 *  <app-document-edit [configFolder]="configFolder" [userFolder]="userFolder"></app-document-edit>
 */

/**
 * @example ts component
  export const configFolder = {
    HOST: 'http://localhost:8001',
    FOLDER_DOC: 'Documents',
    FOLDER_TEMP: 'templates',
    FOLDER_PLUGIN: 'assets/webdav/Plugins'
  };
  userFolder = 'diag_admin';
 */
/**
 * Update webdav ajax library reference
 * http://ajax.webdavsystem.com/
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DocumentEditComponent
  ],
  exports: [
    DocumentEditComponent
  ],
})

export class DocumentEditModule { }
