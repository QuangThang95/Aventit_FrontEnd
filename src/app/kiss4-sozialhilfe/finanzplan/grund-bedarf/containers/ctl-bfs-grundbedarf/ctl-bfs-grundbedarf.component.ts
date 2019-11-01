import { Component, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { GrundBedarfSandbox } from '@app/kiss4-sozialhilfe/finanzplan/grund-bedarf/grund-bedarf.sandbox';
import { PersonenImHaushaltSandbox } from '@app/kiss4-sozialhilfe/personen-im-haushalt/personen-im-haushalt.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { SetClassRight } from '@shared/authorize/authorize.decorators';
import { FragenkatalogConstant } from '@shared/common/sostat.common';
import { GrundBedarfConstant } from '@shared/common/sozialhilfe.common';
import { BaseComponent } from '@shared/components/base.component';
import { PrinterComponent } from '@shared/components/printer/printer.component';
import { CanComponentDeactivate } from '@shared/guards/canDeactivate.guard';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { ModuleConfigSandbox } from '@shared/layouts/left-sidebars/module-config/module-config.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { copyElement } from '@shared/utilites';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { LoadFormDataQueryModel } from '../../models';

@Component({
  selector: 'kiss-ctl-bfs-grundbedarf',
  templateUrl: './ctl-bfs-grundbedarf.component.html',
  styleUrls: ['./ctl-bfs-grundbedarf.component.scss']
})
@SetClassRight('CtlGrundBedarf')
export class CtlBfsGrundbedarfComponent extends BaseComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  //#region 'Declare decorator'
  @ViewChild('formDetail') formDetail: any;
  @ViewChild('printer') printer: PrinterComponent;
  //#endregion

  //#region "Declare variables Array"
  private subscriptions: Subscription[] = [];
  isOnChangeData = false;
  isViewMode = true;
  pageTitle: any;
  isErrorClosed: any;
  isPopupVisible = false;
  isChangeNode = false;
  currentNode: any = null;
  selectNode: any;
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  listBtn = [[], []];
  customizeBtn = [
    {
      text: this.translateService.instant('I007GrundBedarf.Button.Bearbeiten'),
      visible: true,
      name: 'bearbeiten',
      disabled: false,
      icon: 'edit',
      type: 'default'
    },
    {
      text: this.translateService.instant('I007GrundBedarf.Button.Speichern'),
      visible: false,
      name: 'speichern',
      disabled: false,
      icon: 'save',
      type: 'default'
    },
    {
      text: this.translateService.instant('I007GrundBedarf.Button.Abbrechen'),
      visible: false,
      name: 'abbrechen',
      disabled: false,
      icon: 'close',
      type: 'default'
    },
  ];
  popUpModel: PopUpModel;
  isShiftKeyDown = false;
  suffixPageTitle = '';
  pageTitleTemp: string;
  baPersonId: number;
  bgFinanzplanID: number;
  messageErr = null;
  disableEditBtn = false;
  isDisabledSpeichern = false;
  isDatenClickConcurrency = false;
  loadFormDataQueryModel: LoadFormDataQueryModel = {
    faPhaseId: 38001
  };
  constructor(
    injector: Injector,
    public translateService: TranslateService,
    public GrundBedarfSandboxes: GrundBedarfSandbox,
    private moduleConfigSandbox: ModuleConfigSandbox,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public layoutSandbox: LayoutSandbox,
    public router: Router,
    private personenImHaushaltSandbox: PersonenImHaushaltSandbox) {
    super(injector);
  }
  //#endregion

  //#region 'Inject services in contructor and innitdata'
  ngOnInit() {
    this.pageTitle = 'de Lignie, Ivo (09.12.1987) - [Id: 65659] > Monatlicher Grundbedarf vom 01.05.2010 bis 31.10.2010';
    this.registerEvents();
    this.isErrorClosed = false;
    this.initPopUpModel();
    this.setTitle(FragenkatalogConstant.TITLE_PAGE);
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  /**
   * register events sand box
   */
  registerEvents() {
    // register events SanBox tree node
    this.subscriptions.push(this.moduleConfigSandbox.selectNode$.subscribe((node: any) => {
      if (node) {
        if (!this.currentNode) {
          this.currentNode = node.attr;
        } else {
          this.selectNode = node.attr;
        }
      }
    }));
    // Register subscribe for selected person
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (person) {
          this.pageTitle = person.titleText;
          this.pageTitleTemp = person.titleText;
        }
      })
    );
    // Register subscribe for selected node from sidebar
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.selectedNode$.subscribe(selectedNode => {
        if (!selectedNode /*|| selectedNode.id || selectedNode.id === 0*/) {
          return;
        }
        this.setInitialParams(selectedNode);
      })
    );
    this.subscriptions.push(this.GrundBedarfSandboxes.LoadStatusCodeData$.subscribe(data => {
      if (data && data.length > 0) {
        if (data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.InVorbereitung
          || data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Abgelehnt
          || data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Angefragt) {
          this.disableEditBtn = false;
        }
        if (data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Erteilt
          || data[0].bgBewilligungStatusCode === AppEnums.BgBewilligungStatusCode.Gesperrt) {
          this.disableEditBtn = true;
        }
        this.customizeBtn[0].disabled = this.disableEditBtn;
        this.customizeBtn = [...this.customizeBtn];
      }

    })
    );
  }
  private setInitialParams(selectedNode) {
    this.baPersonId = selectedNode.baPersonID;
    this.bgFinanzplanID = selectedNode.bgFinanzplanID;
    this.GrundBedarfSandboxes.loadStatusCodeData(
      {
        bgFinanzplanID: this.bgFinanzplanID,
        baPersonID: this.baPersonId
      }
    );
  }
  /**
   *  unregister subscription on destroy component
   */
  private unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
  }

  // #endregion

  //#region 'Component CRUD functions'
  /**
   * Call SanBox update state tree
   * @param isViewMode
   */
  updateTree(isViewMode: boolean) {
    if (isViewMode) {
      this.moduleConfigSandbox.updateEditModeStatus({ attr: false });
      this.moduleConfigSandbox.updateDirtyFormStatus(false);
    }
  }

  // #endregion

  //#region 'Business function'

  /**
   * @param event
   */
  toolBarOnItemClick(event: string) {
    switch (event) {
      case GrundBedarfConstant.BEARBEITEN_BUTTON:
        this.onClickEditBtn();
        break;
      case GrundBedarfConstant.SPEICHERN_BUTTON:
        break;
      case GrundBedarfConstant.ABBRECHEN_BUTTON:
        this.onClickCancelBtn();
        break;
      default:
        break;
    }
    this.formDetail.toolBarOnItemClick(event);
  }

  onClickEditBtn() {
    this.isViewMode = false;
    this.customizeBtn[0].visible = this.isViewMode;
    this.customizeBtn[1].visible = !this.isViewMode;
    this.customizeBtn[2].visible = !this.isViewMode;
    this.customizeBtn = [...this.customizeBtn];
    this.formDetail.showPencilIcon(true);
  }

  onClickCancelBtn() {
    this.isViewMode = true;
    this.ChangeToViewMode(this.isViewMode);
  }
  ChangeToViewMode(isViewMode) {
    this.customizeBtn[0].visible = isViewMode;
    this.customizeBtn[1].visible = !isViewMode;
    this.customizeBtn[2].visible = !isViewMode;
    this.customizeBtn = [...this.customizeBtn];
    this.formDetail.showPencilIcon(false);
  }
  changeToViewModeEvent($event) {
    this.isViewMode = $event.result;
    this.ChangeToViewMode(this.isViewMode);
  }
  onCloseError() {
    this.isErrorClosed = false;
  }
  /**
   * Shortcuts Key
   * */
  // Shortcuts key
  @HostListener('document:keyup', ['$event'])
  public keyUpEvent(event: KeyboardEvent) {
    if (event.keyCode === AppEnums.KeyCode.KeyShift) {
      event.preventDefault();
      this.isShiftKeyDown = false;
    }
  }
  // Shortcuts key
  @HostListener('document:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyS) {
      if (!this.isViewMode) {
        event.preventDefault();
        this.formDetail.onClickSaveBtn();
      }
    }
    if (event.ctrlKey && event.keyCode === AppEnums.KeyCode.KeyZ) {
      if (!this.isViewMode) {
        event.preventDefault();
        this.onClickCancelBtn();
      }
    }
    if ((event.shiftKey || event.metaKey)) {
      this.isShiftKeyDown = true;
    }
  }
  // #endregion

  //#region 'Utility functions'
  /**
   * @returns {any}
   */
  canDeactivate() {
    return this.formDetail.canDeactivate();
  }

  showPopup() {
  }

  onCopyTitle() {
    let text;
    if (this.isShiftKeyDown) {
      text = this.baPersonId.toString();
      this.handleActionPopup('messagePopup', this.translateService.instant('I007GrundBedarf.Msg.ShiftClickMessage') + ' (' + 'ID=' + text + ')');
    } else {
      text = this.pageTitle;
      this.handleActionPopup('messagePopup', this.translateService.instant('I007GrundBedarf.Msg.DoubleClickMessage'));
    }
    copyElement(text);
  }
  handleActionPopup(key, message: string) {
    this.initPopUpModel();
    if (key === 'messagePopup') {
      this.showMesagePopup(message);
    }
    return message;
  }
  showMesagePopup(message) {
    this.popUpModel.message = message;
    this.popUpModel.isVisibleNo = false;
    this.popUpModel.isVisibleYes = false;
    this.popUpModel.isVisibleTitle = true;
    this.popUpModel.title = this.translateService.instant('I007GrundBedarf.Msg.Information');
    this.popUpModel.isVisible = true;
  }
  //#endregion
  displayRemainingMessage($event) {
    this.isErrorClosed = $event.isErrorClosed;
    this.messageErr = $event.messageErr;
  }
  isConcurrencyEvent($event) {
    if ($event.reusult === 'abbrechen') {
      this.customizeBtn[1].disabled = true;
      this.customizeBtn = [...this.customizeBtn];
      this.isDisabledSpeichern = true;
      // this.formDetail.showPencilIcon(true);
      return;
    }
    if ($event.reusult === 'daten') {
      // TO DO: load form data latest in edit mode
      // this.GrundBedarfSandboxes.loadGrundBedarfFormData(this.loadFormDataQueryModel);
      this.isDatenClickConcurrency = true;
      return;
    }
  }
}
