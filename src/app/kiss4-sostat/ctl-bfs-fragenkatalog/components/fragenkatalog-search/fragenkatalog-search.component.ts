import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CtlBfsFragenkatalogSandbox } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/ctl-bfs-fragenkatalog.sandbox';
import { CtlBfsFragenkatalog } from '@app/kiss4-sostat/ctl-bfs-fragenkatalog/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxButtonComponent, DxFormComponent } from 'devextreme-angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'kiss-fragenkatalog-search',
  templateUrl: './fragenkatalog-search.component.html',
  styleUrls: ['./fragenkatalog-search.component.scss']
})
@SetClassRight('CtlBfsFragenkatalog')
export class FormSeachComponent extends BaseComponent implements OnInit, OnChanges {
  @ViewChild('fragenkatalogSearchFormInstance') fragenkatalogSearchFormInstance: DxFormComponent;
  @ViewChild('buttonAbbrechen') buttonAbbrechen: DxButtonComponent;
  //#region "Declare variables Input And Output"
  @Output() rowSelected: EventEmitter<any> = new EventEmitter();
  @Input() ctlBfsFragenkatalog: CtlBfsFragenkatalog = new CtlBfsFragenkatalog();
  @Input() isDisableViewModel: boolean;
  @Output() stateFormUpdate: EventEmitter<any> = new EventEmitter();
  @Input() dataInitSearch: any;
  @Output() objectSearch: EventEmitter<any> = new EventEmitter();
  @Input() resultUpdate: any;
  @Output() isDisableButtonSave: EventEmitter<any> = new EventEmitter();
  @Output() messageChanged: EventEmitter<any> = new EventEmitter();
  //#endregion

  //#region "Declare variables global"
  katalogVersions: any = null;
  suchens: any = null;
  defaultSelectKatalogVersion: any = null;
  dataSuchen: any = {};
  popUpModel: PopUpModel;
  popupConcurrency: any;
  readonly dataInitPopupConcurrency = {
    title: this.translateService.instant('CtlBfsFragenkatalog.Message.Title'),
    visible: false,
    message: '',
    visibleBtn: false,
    abbrechen: this.translateService.instant('CtlBfsFragenkatalog.Message.Abbrechen'),
    datenAktualisieren: this.translateService.instant('CtlBfsFragenkatalog.Message.Daten-aktualisieren'),
  };
  accessKeyItemFocused = 0;
  readonly detailArrayField: any = [
    { id: 'o006_suchen_kategorie', tagName: 'input', index: 1 },
    { id: 'o006_suchen_variable', tagName: 'input' },
    { id: 'o006_suchen_frage', tagName: 'input' },
    { id: 'o006_suchen_export-attribute', tagName: 'input' },
    { id: 'o006_suchen_katalog-version', tagName: 'input', index: 1 }
  ];
  isViewMode = true;
  isExpand = true;
  options = {
    type: 'default',
    text: this.translateService.instant('CtlBfsFragenkatalog.Ausführen'),
    icon: 'fa fa-search',
    onClick: () => {
      this.onSearchByButton();
    }
  };
  //#endregion

  //#region component life cycle functions
  constructor(injector: Injector, public ctlBfsFragenkatalogSandbox: CtlBfsFragenkatalogSandbox, public translateService: TranslateService) {
    super(injector);
  }

  ngOnInit() {
    this.initPopUpModel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.dataInitSearch) && changes.dataInitSearch.currentValue) {
      this.handleDataInitSearch(changes.dataInitSearch.currentValue);
    }
    if (!isNullOrUndefined(changes.resultUpdate) && changes.resultUpdate.currentValue) {
      this.handleResultUpdate(changes.resultUpdate.currentValue);
    }
  }

  //#endregion

  //#region 'Innit data'
  handleDataInitSearch(dataInitSearch) {
    if (!isNullOrUndefined(dataInitSearch.katalogVersion)) {
      this.katalogVersions = dataInitSearch.katalogVersion;
      this.defaultSelectKatalogVersion = dataInitSearch.katalogVersion[0].code;
      this.dataSuchen.bFSKatalogVersionID = dataInitSearch.katalogVersion[0].code;
      this.objectSearch.emit({ ...this.dataSuchen });
    }
    if (!isNullOrUndefined(dataInitSearch.suchen)) {
      this.suchens = dataInitSearch.suchen;
    }
  }

  handleResultUpdate(dataUpdate) {
    if (dataUpdate.updated) {
      this.stateFormUpdate.emit(true);
      this.ctlBfsFragenkatalogSandbox.loadListCtlBfsFragenkatalog(this.dataSuchen);
      this.rowSelected.emit(dataUpdate.data);
    }
    if (dataUpdate.failed) {
      if (dataUpdate.data.status) {
        const body = JSON.parse(dataUpdate.data._body);
        switch (dataUpdate.data.status) {
          case AppEnums.StatusCode.STATUS_CODE_404:
            this.popupConcurrency.message = this.translateService.instant('CtlBfsFragenkatalog.Message.MessageConcurrencyUpdate');
            this.popupConcurrency.visibleBtn = true;
            this.popupConcurrency.visible = true;
            setTimeout(() => { this.buttonAbbrechen.instance.focus(); }, CommonConstant.SetTimeOut500);
            break;
          default:
            this.messageChanged.emit({ message: body.message, hasError: true });
            break;
        }
      }
    }
  }
  //#endregion

  //#region 'Popup or other'
  popupConcurrencyAbbrechen(isViewMode: boolean) {
    this.isViewMode = isViewMode;
    this.popupConcurrency.visible = false;
  }

  onHiding(event) {
    this.stateFormUpdate.emit(!this.isViewMode);
    if (!this.isViewMode) {
      this.ctlBfsFragenkatalogSandbox.loadListCtlBfsFragenkatalog(this.dataSuchen);
    } else {
      this.isDisableButtonSave.emit(true);

    }
    this.isViewMode = true;
  }

  initPopUpModel() {
    this.popUpModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: true,
        textNo: '',
        isVisibleNo: true,
        funcYes: null,
        funcNo: null,
      }
    );
    this.popupConcurrency = this.dataInitPopupConcurrency;
  }

  showPopup(message, funcYes: Function) {
    this.popUpModel.message = message;
    this.popUpModel.textYes = this.translateService.instant('CtlBfsFragenkatalog.Message.Abbrechen');
    this.popUpModel.textNo = this.translateService.instant('CtlBfsFragenkatalog.Message.Daten-aktualisieren');
    this.popUpModel.title = this.translateService.instant('CtlBfsFragenkatalog.Message.Title');
    this.popUpModel.funcNo = () => { this.popUpModel.isVisible = false; };
    this.popUpModel.funcYes = funcYes;
    this.popUpModel.isVisible = true;
  }
  //#endregion

  //#region 'Business function'
  onKeyDownSelectOpption(e) {
    if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
      e.event.preventDefault();
      if (!e.component.option('opened')) {
        e.component.open();
      } else {
        e.component.close();
      }
    }
  }

  /**
   * Determines whether focus out on
   * @param e event
   * @param idForm form name
   */
  onSearch() {
    setTimeout(() => {
      this.objectSearch.emit({ ...this.dataSuchen });
    }, CommonConstant.SetTimeOut);
  }

  onCollapseSearchContainer(event) {
    this.isExpand = !this.isExpand;
  }

  onSearchContainerClick(event) {
    if (event.currentTarget.getElementsByClassName('dx-state-focused').length <= 0) {
      this.onSearch();
    }
  }

  onSearchByButton() {
    this.onSearch();
  }
  //#endregion
}
