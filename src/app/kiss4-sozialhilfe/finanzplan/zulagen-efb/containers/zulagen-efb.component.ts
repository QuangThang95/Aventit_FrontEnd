import {Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FallfuhrungTreeSandbox} from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import {Router} from '@angular/router';
import {LayoutSandbox} from '@shared/layouts/layouts.sandbox';
import {IPopUpModel} from '@shared/models/shared/popup-confirm.model';
import {Subject, Subscription} from 'rxjs';
import {BaseComponent} from '@shared/components/base.component';
import {CanComponentDeactivate} from '@shared/guards/canDeactivate.guard';
import {FragenkatalogConstant} from '@shared/common/sostat.common';
import {HostListener} from '@angular/core';
import {AppEnums} from '@shared/AppEnum';

export interface  IZulage {
  zulageId: number;
  zulage: string;
}

@Component({
  selector: 'kiss-zulagen-efb',
  templateUrl: './zulagen-efb.component.html',
  styleUrls: ['./zulagen-efb.component.scss']
})
export class ZulagenEfbComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  //#region 'Declare decorator'
  @ViewChild('zulagenList') zulagenList: any;
  //#endregion

  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public router: Router,
    public layoutSandbox: LayoutSandbox
  ) {
    super(injector);
  }

  isEditMode = false;
  isShiftKeyDown = false;
  isDisableBtnEdit = false;
  // Arrow key from
  accessKeyItemFocused = 0;
  keyFocus: string;
  keyInput: string;
  oldDataForm: any;
  popUpModel: IPopUpModel = {
    funcYes: () => {
      this.popUpModel.isVisible = false;
      this.resetModeEdit(false);
    },
    funcNo: () => {
      this.popUpModel.isVisible = false;
      this.resetModeEdit(true);
    },
    message: '',
    textYes: '',
    textNo: '',
    title: '',
    isVisibleTitle: true,
    isVisibleYes: true,
    isVisibleNo: true,
    isVisible: false,
  };

  messageData: {
    message: string,
    isShow: boolean,
  } = null;

  private subscriptions: Subscription[] = [];
  private navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  //#region 'Fake data'
  zulageSelectBox: IZulage[] = [{
    zulageId: 1,
    zulage: 'Arkansas'
  }, {
    zulageId: 2,
    zulage: 'Arkansas 2'
  },
    {
      zulageId: 3,
      zulage: 'Arkansas 3'
    }
  ];

  anteilSelectBox = [{
    anteilId: 1,
    anteil: 'Arkansas'
  }, {
    anteilId: 2,
    anteil: 'Arkansas 10%'
  },
    {
      anteilId: 3,
      anteil: 'Arkansas 20%'
    }
  ];

  dataForm = {
    disPlayOnly: 'Display only',
    zulageId: '1',
    anteilId: '2',
    isAlleinerziehend: true,
    betrag: 1000,
    beschreibung: 'Beschreibung'
  };

  zulageList = [{
    gultigab: 1,
    name: 'Super Mart of the West',
    geburtsdatum: 'Bentonville',
    zulage: 'Arkansas',
    percent: 20,
    betrag: 'Verbrauch',
    bemerkung: 'Bemerkung'
  }, {
    gultigab: 2,
    name: 'Super Mart of the West 2',
    geburtsdatum: 'Bentonville 2',
    zulage: 'Arkansas 2',
    percent: 10,
    betrag: 'Verbrauch 2',
    bemerkung: 'Bemerkung2'
  }];
  //#endregion


  ngOnInit() {
    this.oldDataForm = Object.assign({}, this.dataForm);
    this.resetModeEdit(false);
  }

  ngOnDestroy() {
    this.subscriptions = [];
  }

  private doSaveZulagen() {
    // console.log('data in form: ', this.dataForm);
  }

  //#region Tab/Arrow key
  onHeaderAction(event: string) {
    this.zulagenList.toolBarOnItemClick(event);
  }

  isDataChange() {
    if ((JSON.stringify(this.oldDataForm) !== JSON.stringify(this.dataForm)) && this.isEditMode) {
      return true;
    }
    return false;
  }

  onHandlerKissCardAction(event: string) {
    switch (event) {
      case FragenkatalogConstant.DETAIL_BEARBEITEN: // edit
        this.resetModeEdit(true);
        break;
      case FragenkatalogConstant.DETAIL_SPEICHERN: // save
        this.doSaveZulagen();
        this.resetModeEdit(false);
        break;
      case FragenkatalogConstant.DETAIL_ABBRECHEN: // cancel
        if (this.isDataChange()) {
          this.showPopup('cancel');
        } else {
          this.resetModeEdit(false);
        }
        break;
      default:
        break;
    }
  }
  //#endregion


  //#region Tab/Arrow key
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyTab) {
      return;
    }

    if (event.shiftKey) {
      this.isShiftKeyDown = true;
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
      event.preventDefault();
      this.messageData = {
        message: this.translateService.instant('PersonenImHaushalt.DenyF5Message'),
        isShow: true,
      };
      return;
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyM) {
      event.preventDefault();
      this.messageData = {
        message: this.translateService.instant('PersonenImHaushalt.DenyF8Message'),
        isShow: true,
      };
      return;
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyB) {
      event.preventDefault();
      this.messageData = {
        message: this.translateService.instant('PersonenImHaushalt.DenyF9Message'),
        isShow: true,
      };
      return;
    }

    if (this.isEditMode && event.ctrlKey) {
      if (event.keyCode === AppEnums.KeyCode.KeyS) {
        event.preventDefault();
        this.doSaveZulagen();
        this.resetModeEdit(false);
        return;
      }

      if (event.keyCode === AppEnums.KeyCode.KeyZ) {
        event.preventDefault();
        if (this.isDataChange()) {
          this.showPopup('cancel');
          this.resetModeEdit(true);
        } else {
          this.resetModeEdit(false);
        }
        return;
      }
    }

    // Arrow key
    if (this.isEditMode) {
      if (event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') {
        this.moveFocus(false);
      } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') {
        this.moveFocus(true);
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === 16 || event.metaKey) {
      this.isShiftKeyDown = false;
    }
  }
  /*** Arrow Key*/
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-check-box', 'textarea'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          /*if (this.keyInput === 'checkbox') {
            this.editor.events.focus();
            return;
          }*/
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused + 1) {
            (el as HTMLElement).focus();
            return;
          }
        } else {
          if (+(el as HTMLElement).accessKey === this.accessKeyItemFocused - 1) {
            (el as HTMLElement).focus();
            return;
          }
        }
      }
    }
  }
  //#endregion

  private resetModeEdit(isEditMode) {
    this.isEditMode = isEditMode;
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isEditMode
      });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
  }

  private showPopup(type) {
    this.popUpModel.isVisible = true;
    switch (type) {
      default:
      case 'cancel': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('PersonenImHaushalt.Message.ConfirmDeactive');
        this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Yes');
        this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.No');
        break;
      }
      case 'changeform': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('PersonenImHaushalt.ConfirmMessage');
        this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Discard');
        this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.Abbrechen');
        break;
      }
      case 'information': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        // const message = this.isShiftKeyDown ? this.translateService.instant('PersonenImHaushalt.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')' : this.translateService.instant('PersonenImHaushalt.DoubleClickMessage');
        // this.popUpModel.message = this.translateService.instant(message);
        break;
      }
    }
  }

  canDeactivate() {
    this.resetModeEdit(false);
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }
}
