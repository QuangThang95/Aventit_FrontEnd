import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  HostListener
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { BaseComponent } from '@shared/components/base.component';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { DxTreeListComponent } from 'devextreme-angular/ui/tree-list';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import {
  InsertXDocContextTemplate,
  IXDocInsert,
  VerfuegbarByDocContextID,
  XDocContext,
  ZugeteiltByDocContextID,
} from '../../models';
import { VorlagenKontextConstant } from '../../constant';
import { VorlagenKontextSandbox } from './../../vorlagen-kontext.sandbox';
import { DataListComponent } from '../data-grid/data-grid.component';
import { debounce } from 'lodash-es';

@Component({
  selector: 'app-kontext-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isViewDetail = false;
  @Input() isAddMode = false;
  @Input() xDocContext = new XDocContext();
  @Input() isSave = false;
  @Input() tabIndex = 0;
  @Input() gridFunctionModelVerfubare: GridSettingModel;
  @Output() emitRemainMessage = new EventEmitter<any>();
  @Output() emitListVerfuegbar = new EventEmitter<VerfuegbarByDocContextID[]>();
  @Output() emitTabIndex = new EventEmitter<any>();
  @Output() emitDataSourceChange = new EventEmitter<any>();
  // @ViewChild('verfuegbareGrid') verfuegbareGrid: DxDataGridComponent;
  @ViewChild('zuweisungenAbteilungenTree') zuweisungenAbteilungenTree: DxTreeListComponent;
  @ViewChild('expand') expand: any;
  @ViewChild('verfuegbareGrid') verfuegbareGrid: DataListComponent;
  // @ViewChild('gridFunctionVerfubare') gridFunctionVerfubare: GridFunctionComponent;

  listCol = VorlagenKontextConstant.listColumnDocument;
  treeSelectedIndex: number;
  listZugeteilt: ZugeteiltByDocContextID[] = [];
  listVerfuegbar: VerfuegbarByDocContextID[] = [];
  listOldZugeteilt: ZugeteiltByDocContextID[] = [];
  listOldVerfuegbar: VerfuegbarByDocContextID[] = [];
  elementAddToZu = new ZugeteiltByDocContextID();
  checkBoxesMode = 'none';
  isClickInputOrdername = false;
  listAfterInsertXDocTemplate: VerfuegbarByDocContextID[] = [];
  objMutilSelect = {
    ordnername: '',
    einfugen: false,
  };
  isUpDown = false;
  isRightButtonProcessing = false;
  isLeftButtonProcessing = false;
  filter: any;
  popUpModel: PopUpModel = new PopUpModel(
    {
      title: this.translateService.instant('VorlagenKontext.Message.TitleComfirm'),
      isVisibleTitle: true,
      isVisible: false,
      message: '',
      textYes: this.translateService.instant('VorlagenKontext.Message.ComfirmYes'),
      isVisibleYes: true,
      textNo: this.translateService.instant('VorlagenKontext.Message.ComfirmNo'),
      isVisibleNo: true,
      funcYes: null,
      funcNo: null,
    }
  );
  isUpdateGrid = true;
  isUpdateTree = true;
  treeIndexSelected = 0;
  private folderFakeID = 0;
  private component;
  private e;

  reloadModel = debounce(() => {
    this.vorlagenKontextSandbox.loadZugeteiltByDocContextID(this.xDocContext.docContextID);
    this.vorlagenKontextSandbox.loadVerfuegbarByDocContextID(this.xDocContext.docContextID);
  }, 500);

  private subscriptions: Subscription[] = [];

  constructor(
    injector: Injector,
    private vorlagenKontextSandbox: VorlagenKontextSandbox,
    public translateService: TranslateService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.registerEvent();
  }

  ngOnDestroy(): void {
    this.unregisterEvent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.xDocContext && changes.xDocContext.currentValue && !this.isAddMode) {
      this.reloadModel();
    }
    if (changes.isSave && changes.isSave.currentValue && !changes.isSave.previousValue) {
      this.save(this.xDocContext.docContextID);
    }
    if (changes.isAddMode && changes.isAddMode.currentValue) {
      this.vorlagenKontextSandbox.loadVerfuegbarByDocContextID(null);
      this.objMutilSelect = {
        ordnername: '',
        einfugen: false,
      };
      this.listZugeteilt = [];
      this.listOldZugeteilt = [];
      this.listAfterInsertXDocTemplate = [];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.verfuegbareGrid.gridKontextComponent.instance.repaint();
    this.zuweisungenAbteilungenTree.instance.repaint();
  }

  private registerEvent() {
    this.subscriptions.push(
      this.vorlagenKontextSandbox.getZugeteiltByDocContextID$.subscribe((list: any[]) => {
        if (this.isAddMode) { return; }
        this.listZugeteilt = [];
        this.listOldZugeteilt = [];
        this.isUpdateTree = true;
        this.elementAddToZu = undefined;
        if (Array.isArray(list) && list.length > 0) {
          list.forEach(i => {
            if (i.parentID === null) {
              i.parentID = VorlagenKontextConstant.folder;
            }
          });
          this.listZugeteilt = list;
          this.listOldZugeteilt = list;
          this.elementAddToZu = list[list.length - 1];
        }
      }),
      this.vorlagenKontextSandbox.getVerfuegbarByDocContextID$.subscribe(list => {
        this.isUpdateGrid = true;
        this.listVerfuegbar = list ? list : [];
        this.listOldVerfuegbar = list ? list : [];
        this.emitList();
      }),
      this.vorlagenKontextSandbox.vorlagenKontextAddData$.subscribe((saved: any) => {
        if (!Array.isArray(saved) && !isNullOrUndefined(saved)) {
          this.popUpModel.message = JSON.parse(saved._body).message;
          this.popUpModel.isVisible = true;
          this.popUpModel.funcYes = () => { this.popUpModel.isVisible = false; };
          this.popUpModel.funcNo = () => this.popUpModel.isVisible = false;
        }
        if (Array.isArray(saved) && saved.length > 0) {
          this.save(saved[0].docContextID);
        }
      }),
      this.vorlagenKontextSandbox.getInsertXDocContextTemplate$.subscribe((saved: any) => {
        if (Array.isArray(saved) && saved.length > 0) {
          this.listZugeteilt = [];
        }
      }),
      this.vorlagenKontextSandbox.getVorlagenKontextDeleteXDocContext$.subscribe((saved: any) => {
        if (!isNullOrUndefined(saved) && typeof saved !== 'boolean') {
          this.popUpModel.message = JSON.parse(saved._body).message;
          this.popUpModel.isVisible = true;
          this.popUpModel.funcYes = () => { this.popUpModel.isVisible = false; };
          this.popUpModel.funcNo = () => this.popUpModel.isVisible = false;
          return;
        }
        if (!isNullOrUndefined(saved)) {
          this.vorlagenKontextSandbox.loadXDocContextInitData(null);
          return;
        }
      })
    );
  }

  private unregisterEvent() {
    this.subscriptions.forEach(i => i.unsubscribe());
  }
  public dblTurnRight(e): void {
    if (this.isViewDetail) { return; }
    this.emitTabIndex.emit(VorlagenKontextConstant.buttonRight);
    this.component = e.component;
    this.e = e;
    if ((!this.component.clickCount) || (this.component.clickCount !== 1) || (this.component.clickKey !== this.e.key)) {
      this.initialClick();
    } else if (this.component.clickKey === e.key) {
      if (((new Date().getTime()) - this.component.clickDate) <= 300) {
        this.doubleClick();
        this.turnRight();
      } else {
        this.initialClick();
      }
    }
  }

  public turnRight() {
    if (this.tabIndex !== VorlagenKontextConstant.buttonRight) {
      this.emitTabIndex.emit(VorlagenKontextConstant.buttonLeft);
    }
    if (!this.isRightButtonProcessing) {
      this.verfuegbareGrid.gridKontextComponent.instance.getSelectedRowsData().forEach((element: VerfuegbarByDocContextID) => {
        this.isRightButtonProcessing = true;
        const selectedRow = this.zuweisungenAbteilungenTree.instance.getSelectedRowsData()[0];
        let toListParentID;
        let maxPosition;
        this.folderFakeID = this.folderFakeID - 1;
        if (!selectedRow) {
          maxPosition = this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID === VorlagenKontextConstant.folder));
          toListParentID = VorlagenKontextConstant.folder;
        }
        if (selectedRow && +selectedRow.iconID !== VorlagenKontextConstant.folder) {
          maxPosition = this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID.toString() === selectedRow.parentID.toString()));
          toListParentID = selectedRow.parentID;
        }
        if (selectedRow && +selectedRow.iconID === VorlagenKontextConstant.folder) {
          maxPosition = this.objMutilSelect.einfugen.toString() === 'true' ? this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID.toString() === selectedRow.parentID.toString())) :
            this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID.toString() === selectedRow.xDocContext_TemplateID.toString()));
          toListParentID = this.objMutilSelect.einfugen.toString() === 'true' ? selectedRow.parentID : selectedRow.xDocContext_TemplateID;
        }
        this.elementAddToZu = {
          xDocContext_TemplateID: this.folderFakeID,
          parentID: toListParentID,
          parentPosition: maxPosition + 1,
          folderName: null,
          itemName: element.docTemplateName,
          iconID: element.docFormatCode,
          docContextID: this.xDocContext.docContextID,
          docTemplateID: element.docTemplateID,
        };
        this.listVerfuegbar = this.listVerfuegbar.filter(i => i !== element);
        this.listZugeteilt.push(this.elementAddToZu);
        this.listAfterInsertXDocTemplate.push(element);
        this.isUpdateTree = true;
        this.isUpdateGrid = true;
      });
      this.emitList();
    }
  }

  setSelectedTreeElement(event) {
    if (this.isUpdateTree && this.elementAddToZu) {
      this.treeIndexSelected = event.component.getRowIndexByKey(+this.elementAddToZu.xDocContext_TemplateID);
      if (this.elementAddToZu.iconID !== VorlagenKontextConstant.folder && !this.elementAddToZu.parentID) {
        this.onTreeRowExpanded(event);
        return;
      }
      if (this.treeIndexSelected !== -1) {
        this.onTreeRowExpanded(event);
        return;
      }
      const elementAddToZuFather = this.listZugeteilt.find(i => i.xDocContext_TemplateID === this.elementAddToZu.parentID);
      if (elementAddToZuFather) {
        event.component.expandRow(+elementAddToZuFather.xDocContext_TemplateID);
        return;
      }
      if (this.elementAddToZu.iconID === VorlagenKontextConstant.folder) {
        event.component.expandRow(+this.elementAddToZu.xDocContext_TemplateID);
        return;
      }
    }
  }
  onTreeRowExpanded(event) {
    if (this.isUpdateTree && this.elementAddToZu) {
      event.component.selectRowsByIndexes([this.treeIndexSelected]);
      setTimeout(() => {
        this.zuweisungenAbteilungenTree.instance.getScrollable().scrollToElement(this.zuweisungenAbteilungenTree.instance.getRowElement(this.treeIndexSelected));
        const sons = this.listZugeteilt.filter(i => i.parentID === this.elementAddToZu.parentID);
        if (sons.length === 0 || sons.length === 1) {
          this.setElementToFather();
        } else {
          this.setElementToBesideElement(sons);
        }
        this.isUpdateTree = false;
        this.isRightButtonProcessing = false;
        this.isLeftButtonProcessing = false;
      }, CommonConstant.SetTimeOut);
    }
  }
  setElementToFather() {
    const father = this.listZugeteilt.find(i => +i.xDocContext_TemplateID === +this.elementAddToZu.parentID);
    this.elementAddToZu = father;
  }
  setElementToBesideElement(sons) {
    this.elementAddToZu = sons[sons.length - 2];
  }
  onGridSelectionChanged(event) {
    if (this.isUpdateGrid) {
      this.verfuegbareGrid.gridKontextComponent.instance.repaint();
      this.isUpdateGrid = false;
      const isGridChange = Object.assign({}, { isChange: true });
      this.emitDataSourceChange.emit(isGridChange);
    }
  }
  onTreeSelectionChanged(event) {
    this.treeSelectedIndex = (Array.isArray(event.value)) ? event.component.getRowIndexByKey(event.value[0]) : this.treeSelectedIndex;
  }

  public dblTurnLeft(e): void {
    if (this.isViewDetail) { return; }
    this.emitTabIndex.emit(VorlagenKontextConstant.buttonUp);
    this.component = e.component;
    this.e = e;
    if ((!this.component.clickCount) || (this.component.clickCount !== 1) || (this.component.clickKey !== this.e.key)) {
      this.initialClick();
    } else if (this.component.clickKey === e.key) {
      if (((new Date().getTime()) - this.component.clickDate) <= 300) {
        this.doubleClick();
        this.turnLeft();
      } else {
        this.initialClick();
      }
    }
  }

  public turnLeft() {
    if (this.tabIndex !== VorlagenKontextConstant.buttonUp) {
      this.emitTabIndex.emit(VorlagenKontextConstant.buttonAllLeft);
    }
    if (!this.isLeftButtonProcessing) {
      this.zuweisungenAbteilungenTree.instance.getSelectedRowsData().forEach((element: ZugeteiltByDocContextID) => {
        this.isLeftButtonProcessing = true;
        const indexElement = this.zuweisungenAbteilungenTree.instance.getRowIndexByKey(+element.xDocContext_TemplateID);
        if (+element.iconID !== VorlagenKontextConstant.folder) {
          let verfuegbar = this.listAfterInsertXDocTemplate.find(i => i.docTemplateName === element.itemName);
          verfuegbar = verfuegbar ? verfuegbar : {
            docTemplateID: element.docTemplateID,
            docFormatCode: element.iconID,
            docTemplateName: element.itemName,
          };
          this.listVerfuegbar.splice(0, 0, verfuegbar);
          this.listAfterInsertXDocTemplate = this.listAfterInsertXDocTemplate.filter(i => i !== verfuegbar);
          this.listZugeteilt = this.listZugeteilt.filter(i => i !== element);
          this.closeMessage();
        }
        if (+element.iconID === VorlagenKontextConstant.folder) {
          const listSon = this.listZugeteilt.filter(i => i.parentID === element.xDocContext_TemplateID);
          // If folder still has son/sons, do not to delete, emit message
          if (listSon.length > 0) {
            this.emitMessage('VorlagenKontext.VorlagenkontextDetails.OrdnerMessage');
          } else {
            this.listZugeteilt = this.listZugeteilt.filter(i => i !== element);
            this.closeMessage();
          }
        }
      });
      this.isUpdateTree = true;
      this.isUpdateGrid = true;
      this.emitList();
    }
  }

  public allLeft(): void {
    this.emitTabIndex.emit(VorlagenKontextConstant.zugeteilTree);
    this.listZugeteilt.forEach((element: ZugeteiltByDocContextID) => {
      this.listZugeteilt = this.listZugeteilt.filter(i => i !== element);
      if (element.iconID === 0) {
      } else {/**
        * delete from list Zugeteilt
        * add to list Verfuegbar
        * delete from list AfterInsertXDocTemplate
        * check is a fake id
        */
        let verfuegbar = this.listAfterInsertXDocTemplate.find(i => i.docTemplateName === element.itemName);
        verfuegbar = verfuegbar ? verfuegbar : {
          docTemplateID: element.docTemplateID,
          docFormatCode: element.iconID,
          docTemplateName: element.itemName,
        };
        this.listVerfuegbar.splice(0, 0, verfuegbar);
        this.listAfterInsertXDocTemplate = this.listAfterInsertXDocTemplate.filter(i => i !== verfuegbar);
      }
      this.isUpdateGrid = true;
    });
    this.emitList();
  }

  confirmAllLeft() {
    if (this.listZugeteilt.length > 0) {
      this.popUpModel = new PopUpModel(
        {
          title: this.translateService.instant('VorlagenKontext.Message.TitleComfirm'),
          isVisibleTitle: true,
          isVisible: true,
          message: this.translateService.instant('VorlagenKontext.VorlagenkontextDetails.TreeAllLeft'),
          textYes: this.translateService.instant('VorlagenKontext.Message.ComfirmYes'),
          isVisibleYes: true,
          textNo: this.translateService.instant('VorlagenKontext.Message.ComfirmNo'),
          isVisibleNo: true,
          funcYes: () => { this.allLeft(); this.popUpModel.isVisible = false; },
          funcNo: () => this.popUpModel.isVisible = false,
        }
      );
    }
  }

  headerClick(e, mode: string) {
    if (e.rowType === 'header') {
      switch (mode) {
        case 'tree': {
          this.dblTurnLeft(e);
          break;
        }
        case 'grid': {
          this.dblTurnRight(e);
          break;
        }
      }
    }
  }

  public upKontext() {
    this.emitTabIndex.emit(VorlagenKontextConstant.buttonDown);
    this.isUpDown = true;
    this.zuweisungenAbteilungenTree.instance.getSelectedRowsData().forEach((element: ZugeteiltByDocContextID) => {
      const listSon = this.listZugeteilt.filter(i => i.parentID === element.parentID);
      const minPosition = this.findMinPosition(listSon);
      if (listSon.length > 1 && element.parentPosition > minPosition) {
        let upParentPosition = listSon[0].parentPosition;
        listSon.forEach(i => {
          if (+i.parentPosition < +element.parentPosition && +upParentPosition < +i.parentPosition) {
            upParentPosition = +i.parentPosition;
          }
        });
        const higherElement = listSon.find(i => +i.parentPosition === +upParentPosition);
        const indexElement = this.listZugeteilt.findIndex(i => i === element);
        const indexHigherElement = this.listZugeteilt.findIndex(i => i === higherElement);
        const upElement = Object.assign({}, element, { parentPosition: upParentPosition });
        const downElement = Object.assign({}, higherElement, { parentPosition: element.parentPosition });
        this.listZugeteilt = [].concat(this.listZugeteilt.slice(0, indexElement)).concat(downElement).concat(this.listZugeteilt.slice(indexElement + 1));
        this.listZugeteilt = [].concat(this.listZugeteilt.slice(0, indexHigherElement)).concat(upElement).concat(this.listZugeteilt.slice(indexHigherElement + 1));
      }
    });
    this.isUpDown = false;
  }

  public downKontext() {
    this.emitTabIndex.emit(VorlagenKontextConstant.ordnername);
    this.isUpDown = true;
    this.zuweisungenAbteilungenTree.instance.getSelectedRowsData().forEach((element: ZugeteiltByDocContextID) => {
      const listSon = this.listZugeteilt.filter(i => i.parentID === element.parentID);
      const maxPosition = this.findMaxPosition(listSon);
      if (listSon.length > 1 && element.parentPosition < maxPosition) {
        let downParentPosition = maxPosition;
        listSon.forEach(i => {
          if (+i.parentPosition > +element.parentPosition && +downParentPosition > +i.parentPosition) {
            downParentPosition = +i.parentPosition;
          }
        });
        const lowerElement = listSon.find(i => +i.parentPosition === +downParentPosition);
        const indexElement = this.listZugeteilt.findIndex(i => i === element);
        const indexLowerElement = this.listZugeteilt.findIndex(i => i === lowerElement);
        const upElement = Object.assign({}, lowerElement, { parentPosition: element.parentPosition });
        const downElement = Object.assign({}, element, { parentPosition: downParentPosition });
        this.listZugeteilt = [].concat(this.listZugeteilt.slice(0, indexElement)).concat(upElement).concat(this.listZugeteilt.slice(indexElement + 1));
        this.listZugeteilt = [].concat(this.listZugeteilt.slice(0, indexLowerElement)).concat(downElement).concat(this.listZugeteilt.slice(indexLowerElement + 1));
      }
    });
    this.isUpDown = false;
  }

  initialClick() {
    this.component.clickCount = 1;
    this.component.clickKey = this.e.key;
    this.component.clickDate = new Date();
  }

  doubleClick() {
    this.component.clickCount = 0;
    this.component.clickKey = 0;
    this.component.clickDate = null;
  }

  createFolder(e) {
    if (!this.isRightButtonProcessing) {
      this.isRightButtonProcessing = true;
      e.event.stopPropagation();
      this.emitTabIndex.emit(VorlagenKontextConstant.einfugen);
      if (!this.objMutilSelect.ordnername || this.objMutilSelect.ordnername.trim() === '') {
        this.isRightButtonProcessing = false;
        this.emitMessage('VorlagenKontext.VorlagenkontextDetails.NewOrdnerMessage');
      } else {
        const selectedRow = this.zuweisungenAbteilungenTree.instance.getSelectedRowsData()[0];
        // let insertParentID;
        let toListParentID;
        let maxPosition;
        this.folderFakeID = this.folderFakeID - 1;
        if (!selectedRow) {
          maxPosition = this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID === VorlagenKontextConstant.folder));
          toListParentID = VorlagenKontextConstant.folder;
        }
        if (selectedRow && +selectedRow.iconID !== VorlagenKontextConstant.folder) {
          maxPosition = this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID.toString() === selectedRow.parentID.toString()));
          toListParentID = selectedRow.parentID;
        }
        if (selectedRow && +selectedRow.iconID === VorlagenKontextConstant.folder) {
          maxPosition = this.objMutilSelect.einfugen.toString() === 'true' ? this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID.toString() === selectedRow.parentID.toString())) :
            this.findMaxPosition(this.listZugeteilt.filter(i => i.parentID.toString() === selectedRow.xDocContext_TemplateID.toString()));
          toListParentID = this.objMutilSelect.einfugen.toString() === 'true' ? selectedRow.parentID : selectedRow.xDocContext_TemplateID;
        }
        this.elementAddToZu = {
          xDocContext_TemplateID: this.folderFakeID,
          parentID: toListParentID,
          parentPosition: maxPosition + 1,
          folderName: this.objMutilSelect.ordnername,
          itemName: this.objMutilSelect.ordnername,
          iconID: 0,
          docContextID: this.xDocContext.docContextID,
          docTemplateID: null,
        };
        this.listZugeteilt.push(this.elementAddToZu);
        this.closeMessage();
        this.isUpdateTree = true;
        this.isUpdateGrid = true;
      }
    }
  }

  emitMessage(message) {
    this.emitRemainMessage.emit({
      visible: true,
      message: message,
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  closeMessage() {
    this.emitRemainMessage.emit({
      visible: false,
      message: null,
    });
  }

  emitList() {
    this.emitListVerfuegbar.emit(this.listVerfuegbar);
  }

  findMaxPosition(list: ZugeteiltByDocContextID[]): number {
    return Math.max.apply(Math, list.map(function (o) { return o.parentPosition; }));
  }

  findMinPosition(list: ZugeteiltByDocContextID[]): number {
    return Math.min.apply(Math, list.map(function (o) { return o.parentPosition; }));
  }

  loadTreeCell(event): string {
    const zugeteilt = this.listZugeteilt.find(i => i.itemName === event);
    return zugeteilt ? zugeteilt.itemName : '';
  }

  loadTreeIconCell(event): string {
    const zugeteilt = this.listZugeteilt.find(i => i.itemName === event);
    if (zugeteilt) {
      switch (+zugeteilt.iconID) {
        case 0: {
          return 'fa fa-folder';
          break;
        }
        case 1: {
          return 'fa fa-file-word-o';
          break;
        }
        case 2: {
          return 'fa fa-file-excel-o';
          break;
        }
      }
    } else {
      return;
    }
  }

  save(docContextID) {
    const listInsert: InsertXDocContextTemplate[] = this.listZugeteilt.map(i => {
      const elementInsert: InsertXDocContextTemplate = {
        xDocContext_TemplateID: i.xDocContext_TemplateID,
        docContextID: docContextID,
        docTemplateID: i.docTemplateID,
        folderName: i.folderName,
        parentID: i.parentID === VorlagenKontextConstant.folder ? null : i.parentID,
        parentPosition: i.parentPosition,
      };
      return elementInsert;
    });
    const objectInsert: IXDocInsert = {
      docContextID: docContextID,
      xDocContext_TemplateList: listInsert,
    };
    this.vorlagenKontextSandbox.insertXDocContextTemplate(objectInsert);
  }

  onFocusedRowChanged(event) {
    if (!isNullOrUndefined(event)) {
      event.component.selectRowsByIndexes([event.rowIndex]);
    }
  }

  gridToScrollable(index, component) {
    const row = component.getRowElement(index);
    component.getScrollable().scrollToElement(row);
  }

  onCheckBox() {
    this.emitTabIndex.emit(VorlagenKontextConstant.buttonAddToTree);
  }
  onOrdernameClick() {
    this.emitTabIndex.emit(VorlagenKontextConstant.einfugen);
  }

  setSelectedGridElement(event) {
    if (this.isUpdateGrid) {
      event.component.selectRowsByIndexes([0]);
    }
  }
}
