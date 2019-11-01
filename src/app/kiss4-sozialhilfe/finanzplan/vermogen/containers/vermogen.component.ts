import { Component, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { CommonConstant } from '@shared/common/constant.common';
import { VermogenConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridFunctionComponent } from '@shared/components/grid-function/grid-function.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { IPopUpModel } from '@shared/models/shared/popup-confirm.model';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { locale } from 'devextreme/localization';
import { VermogenSandbox } from '../vermogen.sandbox';

@Component({
  selector: 'kiss-vermogen',
  templateUrl: './vermogen.component.html',
  styleUrls: ['./vermogen.component.scss']
})
@SetClassRight('CtlVermogen')
export class VermogenComponent extends BaseComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('vermogenList') vermogenList: any;
  @ViewChild('formDetail') formDetail: any;
  @ViewChild('gridFunction') gridFunction: GridFunctionComponent;

  filter: any;

  rowSelectedOfGrid: any = null;
  isDisableGrid = false;

  pageTitle: any;
  listBtn = [CommonConstant.ToolbarButtons, CommonConstant.AdditionalButtons.filter(x => x.name === CommonConstant.DeleteBtn)];

  isShiftKeyDown = false;

  baPersonID: number = null;

  popUpModel: IPopUpModel = {
    funcYes: () => {
      this.popUpModel.isVisible = false;
      this.formDetail.isViewModel = true;
    },
    funcNo: () => {
      this.popUpModel.isVisible = false;
      this.formDetail.isViewModel = false;
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

  // Fake data
  vermogens = [
    {
      Id: 1,
      Freibetrag: 123,
      Angerechnet: 200,
      Gultigab: '',
      Name: 'Balaba, Ali',
      Geburtsdatum: '15.06.1987',
      ArtDesVermogens: 'Arkansas',
      Vermogen: 5000,
      Verbrauch: 200000
    }, {
      Id: 2,
      Freibetrag: 345,
      Angerechnet: 500,
      Gultigab: '',
      Name: 'Nguyen Canh Hung',
      Geburtsdatum: '22.05.1992',
      ArtDesVermogens: 'Akitien, Obligationen',
      Vermogen: 3000,
      Verbrauch: 89000
    }, {
      Id: 3,
      Freibetrag: 225,
      Angerechnet: 699,
      Gultigab: '',
      Name: 'Mohamez Ali',
      Geburtsdatum: '15.08.1991',
      ArtDesVermogens: 'Tan Vuong, Barvermogen',
      Vermogen: 2500,
      Verbrauch: 9900
    }
  ];

  // data face selectbox
  dataSelectBox = [];

  persons: string[] = [
    'Perter',
    'Canh Hung',
    'AAAAA',
  ];

  artDesVermogens: string[] = [
    'Alibaba',
    'Canh Hung',
    'Mohamez',
  ];


  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public layoutSandbox: LayoutSandbox,
    public router: Router,
    public vermogenSandboxes: VermogenSandbox,
  ) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
    // this.pageTitle = 'de Lignie, Ivo (09.12.1987) - [Id: 65659] > Vermogen und monatlicher Vermogensverbrauch vom 01.05.2010 bis 31.10.2010';
    this.vermogenSandboxes.loadSelectboxData();
  }

  rowSelectChange(rowSelected) {
    this.rowSelectedOfGrid = rowSelected;
  }

  onDisableGrid(event) {
    this.isDisableGrid = event;
    this.setIconPencilOfTree(event);
  }

  setIconPencilOfTree(isEditMode) {
    this.fallfuhrungTreeSandbox.updateNodesStatus(
      {
        id: this.router.url,
        isEditMode: isEditMode
      });
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
  }

  /**
   * Shortcuts Key
   * */
  @HostListener('document:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === 16 || event.metaKey) {
      this.isShiftKeyDown = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyI) {
      // Todo: open add new form
      event.preventDefault();
      this.formDetail.toolBarOnItemClick(VermogenConstant.NEUE_VERMOGEN_BUTTON);
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      // Todo: cancel form
      event.preventDefault();
      this.formDetail.toolBarOnItemClick(VermogenConstant.ABBRECHEN_BUTTON);
    }

    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      // Todo: save form
      event.preventDefault();
      this.formDetail.toolBarOnItemClick(VermogenConstant.SPEICHERN_BUTTON);
    }

  }
  // #endregion

  onDblClickMessage() {
    this.showPopup('information');
  }

  onHeaderAction(event) {
    this.vermogenList.toolBarOnItemClick(event);
  }

  canDeactivate() {
    this.setIconPencilOfTree(false);
    this.layoutSandbox.deleteSelectedActionItems(this.layoutSandbox.getDeletingSticky());
    return true;
  }

  onHandleDetailAction(event: string) {
    switch (event) {
      case VermogenConstant.NEUE_VERMOGEN_BUTTON:
        break;
      case VermogenConstant.BEARBEITEN_BUTTON:
        break;
      case VermogenConstant.SPEICHERN_BUTTON:
        break;
      case VermogenConstant.ABBRECHEN_BUTTON:
        this.showPopup('cancel');
        break;
      default:
        break;
    }
  }

  private showPopup(type) {
    this.popUpModel.isVisible = true;
    switch (type) {
      case 'information': {
        this.baPersonID = 123999;
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleInformationMessage');
        this.popUpModel.isVisibleYes = false;
        this.popUpModel.isVisibleNo = false;
        const message = this.isShiftKeyDown ? this.translateService.instant('PersonenImHaushalt.ShiftClickMessage') + ' (' + 'ID=' + this.baPersonID + ')' : this.translateService.instant('PersonenImHaushalt.DoubleClickMessage');
        this.popUpModel.message = this.translateService.instant(message);
        break;
      }
      case 'cancel': {
        this.popUpModel.title = this.translateService.instant('PersonenImHaushalt.TitleCancelMessage');
        this.popUpModel.message = this.translateService.instant('PersonenImHaushalt.Message.ConfirmDeactive');
        this.popUpModel.textYes = this.translateService.instant('PersonenImHaushalt.Yes');
        this.popUpModel.textNo = this.translateService.instant('PersonenImHaushalt.No');
        break;
      }
      default:
        break;
    }
  }
}

