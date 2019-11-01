import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
} from '@angular/core';
import { TemplateModel } from './template.model';

declare var ITHit: any;

export enum typeAction {
  new,
  delete
}

export const DEFAULT = {
  HOST: '',
  FOLDER_DOC: '',
  FOLDER_TEMP: '',
  FOLDER_PLUGIN: 'assets/webdav/Plugins',
};

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit, AfterViewInit {

  private pathUser = '';
  private pathTemp = '';
  private pathDocs = '';
  private pathPlugins = '';
  private sFileAbsolutePath = '';

  @Input() configFolder;
  @Input() userFolder = '';

  fileName = '';
  handlerText = 'New';
  action = typeAction.new;

  isToggle: boolean;
  templates: TemplateModel[] = [];

  protected header: Headers;
  protected config;
  protected user;

  constructor() {
  }

  ngOnInit(): void {
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json');
    this.config = this.configFolder || DEFAULT;
    this.user = this.userFolder;
    this.pathUser = `${this.config.HOST}/${this.userFolder}`;
    this.pathTemp = `${this.pathUser}/${this.config.FOLDER_TEMP}`;
    this.pathDocs = `${this.pathUser}/${this.config.FOLDER_DOC}`;
    this.pathPlugins = `/${this.config.FOLDER_PLUGIN}`;
    this.sFileAbsolutePath = `${this.pathUser}/${this.config.FOLDER_TEMP}/_blank.docx`;
  }

  ngAfterViewInit(): void {
    this.webDavGetFolders();
  }

  btnToogle() {
    this.isToggle = !this.isToggle;
  }

  openFile(): void {
    this.webDavOpenFile(this.fileName);
  }

  handlerButton(action: typeAction): void {
    switch (action) {
      case typeAction.new:
        this.webDavNew();
        break;
      case typeAction.delete:
        this.webDavDelete();
        break;
      default:
        break;
    }
  }

  newTemplate(item: TemplateModel) {
    const webDavSession = new ITHit.WebDAV.Client.WebDavSession();
    const fName = `${item.DisplayName}_${new Date().getTime()}.docx`;
    const sFolderPath = `${this.pathUser}/${this.pathDocs}`;
    const fCallback = function (e) {
      console.log('fCallback', e);
    };
    // const webDavSession = new ITHit.WebDAV.Client.WebDavSession();
    webDavSession.OpenFileAsync(this.sFileAbsolutePath, null, function (oFileAsyncResult) {
      /** @typedef {ITHit.WebDAV.Client.File} oFile */
      const oFile = oFileAsyncResult.Result;

      webDavSession.OpenFolderAsync(sFolderPath, null, function (oFolderAsyncResult) {
        /** @typedef {ITHit.WebDAV.Client.Folder} oFolder */
        const oFolder = oFolderAsyncResult.Result;

        oFile.CopyToAsync(oFolder, fName, true, null, null, function (oAsyncResult) {

          if (oAsyncResult.IsSuccess) {
            console.log('Copy successfully completed.');
          } else if (oAsyncResult.Error instanceof ITHit.WebDAV.Client.Exceptions.PreconditionFailedException) {
            console.log('The item with such name exists and `overwrite` was `false`.');
          } else if (oAsyncResult.Error instanceof ITHit.WebDAV.Client.Exceptions.WebDavHttpException) {
            let sErrorText = oAsyncResult.Error.Message + ' ' + oAsyncResult.Error.Status.Code + ' ' +
              oAsyncResult.Error.Status.Description;

            // Find which items failed to copy.
            for (let i = 0, l = oAsyncResult.Error.Multistatus.Responses.length; i < l; i++) {
              const oResponse = oAsyncResult.Error.Multistatus.Responses[i];
              sErrorText += '\n' + oResponse.Href + ' ' + oResponse.Status.Code + ' ' +
                oResponse.Status.Description;
            }
            console.log('Copy error: ' + sErrorText);
          } else {
            console.log('Copy error: ' + String(oAsyncResult.Error));
          }
          fCallback(oAsyncResult);
        });
      });
    });

    this.updateControl(fName, 'Delete', typeAction.delete, false);
    // open file after new
    this.webDavOpenFile(this.fileName);
  }

  private updateControl(fName, displayText, action, isToggle?): void {
    this.fileName = fName;
    this.handlerText = displayText;
    this.action = action;
    this.isToggle = isToggle;
  }

  private webDavNew() {
    const sFolderDoc = `${this.pathUser}/${this.pathDocs}`;
    const fName = `temp_${new Date().getTime()}.docx`;
    const fCallback = function (e) {
      console.log('fCallback', e);
    };
    const webDavSession = new ITHit.WebDAV.Client.WebDavSession();
    webDavSession.OpenFileAsync(this.sFileAbsolutePath, null, function (oFileAsyncResult) {

      /** @typedef {ITHit.WebDAV.Client.File} oFile */
      const oFile = oFileAsyncResult.Result;

      webDavSession.OpenFolderAsync(sFolderDoc, null, function (oFolderAsyncResult) {
        /** @typedef {ITHit.WebDAV.Client.Folder} oFolder */
        const oFolder = oFolderAsyncResult.Result;

        oFile.CopyToAsync(oFolder, fName, true, null, null, function (oAsyncResult) {

          if (oAsyncResult.IsSuccess) {
            console.log('Copy successfully completed.');
          } else if (oAsyncResult.Error instanceof ITHit.WebDAV.Client.Exceptions.PreconditionFailedException) {
            console.log('The item with such name exists and `overwrite` was `false`.');
          } else if (oAsyncResult.Error instanceof ITHit.WebDAV.Client.Exceptions.WebDavHttpException) {
            let sErrorText = oAsyncResult.Error.Message + ' ' + oAsyncResult.Error.Status.Code + ' ' +
              oAsyncResult.Error.Status.Description;

            // Find which items failed to copy.
            for (let i = 0, l = oAsyncResult.Error.Multistatus.Responses.length; i < l; i++) {
              const oResponse = oAsyncResult.Error.Multistatus.Responses[i];
              sErrorText += '\n' + oResponse.Href + ' ' + oResponse.Status.Code + ' ' +
                oResponse.Status.Description;
            }

            console.log('Copy error: ' + sErrorText);
          } else {
            console.log('Copy error: ' + String(oAsyncResult.Error));
          }
          fCallback(oAsyncResult);
        });
      });
    });
    this.updateControl(fName, 'Delete', typeAction.delete);
    // open file after new
    this.webDavOpenFile(this.fileName);
  }

  private webDavOpenFile(file: String) {
    if (!file) { return; }
    // tslint:disable-next-line:no-debugger
    ITHit.WebDAV.Client.DocManager.MsOfficeEditExtensions.Word.push('docx');
    ITHit.WebDAV.Client.DocManager.EditDocument(`
      ${this.pathDocs}/${file}`, '/',
      this.protocolInstallCallback);
    this.handlerText = 'Delete';
  }

  private webDavDelete() {
    // delete file
    const pathUser: String = this.pathUser;
    const sFolderAbsolutePath = `${pathUser}/${this.pathDocs}`;
    const sFileAbsolutePath = `${sFolderAbsolutePath}/${this.fileName}`;
    const fCallback = function (e) {
      console.log('fCallback', e);
    };
    const webDavSession = new ITHit.WebDAV.Client.WebDavSession();
    webDavSession.OpenFileAsync(sFileAbsolutePath, null, function (oFileAsyncResult) {

      /** @typedef {ITHit.WebDAV.Client.File} oFile */
      const oFile = oFileAsyncResult.Result;

      // tslint:disable-next-line:no-shadowed-variable
      oFile.DeleteAsync(null, function (oAsyncResult) {
        if (oAsyncResult.IsSuccess) {
          console.log('File successfully deleted.');
        } else if (oAsyncResult.Error instanceof ITHit.WebDAV.Client.Exceptions.WebDavHttpException) {
          let sErrorText = oAsyncResult.Error.Message + ' ' + oAsyncResult.Error.Status.Code + ' ' +
            oAsyncResult.Error.Status.Description;

          // Find which items failed to delete.
          for (let i = 0, l = oAsyncResult.Error.Multistatus.Responses.length; i < l; i++) {
            const oResponse = oAsyncResult.Error.Multistatus.Responses[i];
            sErrorText += '\n' + oResponse.Href + ' ' + oResponse.Status.Code + ' ' +
              oResponse.Status.Description;
          }

          console.log('Delete error: ' + sErrorText);
        } else {
          console.log('Delete error: ' + String(oAsyncResult.Error));
        }

        fCallback(oAsyncResult);
      });
    });
    this.updateControl('', 'New', typeAction.new);
  }

  private webDavGetFolders() {
    const pathUser = this.pathUser;
    const sFolderAbsolutePath = `${pathUser}/${this.pathTemp}`;
    const webDavSession = new ITHit.WebDAV.Client.WebDavSession();
    const fCallBack = (e) => {
      this.templates = e;
    };

    webDavSession.OpenFolderAsync(sFolderAbsolutePath, null, function (oFolderAsyncResult) {
      /** @typedef {ITHit.WebDAV.Client.Folder} oFolder */
      const oFolder = oFolderAsyncResult.Result;
      oFolder.GetChildrenAsync(null, null, function (oItemsAsyncResult) {
        /** @typedef {ITHit.WebDAV.Client.HierarchyItems[]} aItems */
        const aItems = oItemsAsyncResult.Result;
        const listFiles = aItems.map(item => new TemplateModel(item));
        fCallBack(listFiles);
      });
    });
  }

  protocolInstallCallback(message) {
    const pathPlugins: String = `/${this.config.FOLDER_PLUGIN}`;
    const installerFilePath = `${pathPlugins}` +
      ITHit.WebDAV.Client.DocManager.GetInstallFileName();

    if (confirm('This action requires a protocol installation. Select OK to download the protocol installer.')) {
      window.open(installerFilePath);
    }
  }
}
