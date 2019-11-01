import { DatePipe } from '@angular/common';
import { Component, DoCheck, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FallNavFilterModel } from '@app/kiss4-main/fall-navigator/models';
import { TranslateService } from '@ngx-translate/core';
import { AppEnums } from '@shared/AppEnum';
import { FallfuhrungTreeConstant } from '@shared/common/fallfuhrung-tree.common';
import { BaseComponent } from '@shared/components/base.component';
import { LayoutSandbox } from '@shared/layouts/layouts.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import {
  getLanguageCodeNumberFromLocalStorage,
  getRoleSessionStorage,
  getUserIdFromLocalStorage,
  getUserRightSessionStorage,
} from '@shared/utilites';
import { DxTreeViewComponent } from 'devextreme-angular';
import { Subject, Subscription } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { FallfuhrungTreeSandbox } from '../fallfuhrung-tree.sandbox';
import { FallNavigator, Message, Person } from '../models';
import { BNavigatorItemsQuery } from '../models/b-navigator.model';
import { BapersonRelationQuery } from '../models/baperson-relation.model';
import {
  GetConfigIntQueryModel,
  GetCountFaPhaseModel,
  GetFaLeistungByBaPersonIDModel,
  InsertFaPhaseQueryModel,
  MessageInformationQueryModel,
  UpdateFaLeistungQueryModel,
} from '../models/beratungsphase.model';
import { RightContentItem } from '../models/right-content-item.model';
import { TreeViewItem, TreeViewItemsQuery } from '../models/tree-view-item.model';

@Component({
  selector: 'kiss-fallfuhrung-tree',
  templateUrl: './fallfuhrung-tree.component.html',
  styleUrls: ['./fallfuhrung-tree.component.scss']
})
export class FallfuhrungTreeComponent extends BaseComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild('treeView') treeView: DxTreeViewComponent;

  icon_Characters_Url: any = 'assets/icon/characters-and-numbers/png/';
  readonly NEUS_INTAKE_FAPHASE_CODE = 1;
  readonly NEUS_BERATUNGSPHASE_FAPHASE_CODE = 2;
  baPersonID: string;
  iconName = '';
  iconShortName = '';
  person: Person;
  showedTimeLine = false;
  disabledTimeLine = false;
  isShiftKeyDown = false;
  isPopupVisible = false;
  private subscriptions: Subscription[] = [];
  private treeViewItemsQuery: any;
  treeViewDataSource: any[] = [];
  rightContentItems: RightContentItem[];
  initialSelectedItem: TreeViewItem;
  selectedItem: any;
  newFaPhaseAddition: any;
  isNeuesIntakeVisible: boolean;
  isNeueBeratungsphaseVisible: boolean;
  isLoschenVisible: boolean;
  isFrmFallZugriffVisible: boolean;
  isFrmFallInfoVisible: boolean;
  isPeriode: boolean;
  isPhase: boolean;
  owner: any;
  userIsOwner: boolean;
  viewEntfernenPerson = false;
  entfernenPerson = '';
  deleteTreeNodeObj: Message = new Message();
  isDeleteFaPhaseSuccess = false;
  pkey: number;
  userID: string;
  dataNavigator: FallNavigator = new FallNavigator();
  popUpModel: PopUpModel;
  deleteResult: any;
  nodeAfterDelete: any;
  textDisplayModel: any;
  stickyItems: any;
  nodesStatus: any;
  faPhaseCode: number;
  countIntake: number;
  countOpenIntake: number;
  countBeratung: number;
  countOpenBeratung: number;
  configTotalIntakePhasen: number;
  configOffeneIntakePhasen: number;
  configIntakeErstePhase: number;
  configTotalBeratungsphasen: number;
  getCountFaPhaseModel: GetCountFaPhaseModel = new GetCountFaPhaseModel();
  modelQueryConfigToTalIntake: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigOffeneIntake: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigTotalBeratungsphasen: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigTransferPhaseUser: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  modelQueryConfigIntakeErstePhase: GetConfigIntQueryModel = new GetConfigIntQueryModel();
  newDate: any;
  insertFaPhaseQueryModel: InsertFaPhaseQueryModel = new InsertFaPhaseQueryModel();
  faLeistungByBaPersonIDModel: GetFaLeistungByBaPersonIDModel = new GetFaLeistungByBaPersonIDModel();
  transfer: boolean;
  idInsertFaPhase: number;
  updateFaLeistungQueryModel: UpdateFaLeistungQueryModel = new UpdateFaLeistungQueryModel();
  identity: number;
  information = 'information';
  modelQueryMessage: MessageInformationQueryModel = new MessageInformationQueryModel();
  ctlFaModulTree = 'CtlFaModulTree';
  // module B
  CtlBaHaushalt = FallfuhrungTreeConstant.CtlBaHaushalt;
  CtlBaInstitutionenFachpersonen = FallfuhrungTreeConstant.CtlBaInstitutionenFachpersonen;
  CtlArbeit = FallfuhrungTreeConstant.CtlArbeit;
  CtlGesundheit = FallfuhrungTreeConstant.CtlGesundheit;
  CtlBaPerson = FallfuhrungTreeConstant.CtlBaPerson;

  clickStream$ = new Subject();
  dbclickStream$ = this.clickStream$.pipe(buffer(this.clickStream$.pipe(debounceTime(300))));
  treeFallNavigator: any;
  newBaPerson: any;
  limitedSelectedActions: Array<any> = [];
  languageCurrent: any;
  showPopover = false;

  constructor(
    private router: Router,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox,
    public translateService: TranslateService,
    private datePipe: DatePipe,
    public layoutSandbox: LayoutSandbox,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.setTitle(FallfuhrungTreeConstant.titlePage);
    this.initData();
    this.registerEvents();
    this.initPopUpModel();
  }

  ngDoCheck() {
    if (this.languageCurrent && localStorage.getItem('currentLang.Culture') !== this.languageCurrent) {
      this.languageCurrent = localStorage.getItem('currentLang.Culture');
      this.getTreeViewItems();
    }
  }

  initData(): void {
    const userRight = getUserRightSessionStorage();
    const rightName = userRight ? userRight.RightName : '';
    this.disabledTimeLine = rightName === 'FrmFaZeitachse';
    this.userID = getUserIdFromLocalStorage();
    this.languageCurrent = localStorage.getItem('currentLang.Culture');
    this.initDataFromUrl();
    this.fallfuhrungTreeSandbox.getIconMoudle(this.baPersonID, '');
    this.fallfuhrungTreeSandbox.getVisibleZeitachse();
    this.fallfuhrungTreeSandbox.getPersonInfoTitle(this.baPersonID, +getUserIdFromLocalStorage(), +getLanguageCodeNumberFromLocalStorage());
    const filters: FallNavFilterModel = {
      UserId: localStorage.getItem('user:userId'),
      Active: true,
      Closed: true,
      Archived: true,
      IncludeGroup: true,
      IncludeGuest: true,
      IncludeTasks: true
  };
    this.fallfuhrungTreeSandbox.getTreeFallNavigator(filters);
  }

  registerEvents() {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.handleUrlChange(event.url);
        }
      })
    );

    this.subscriptions.push(
      this.layoutSandbox.selectedAction$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.stickyItems = data;
          this.limitedSelectedActions = this.stickyItems.length > 6 ? this.stickyItems.slice(length - 6, length) : this.stickyItems;
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreePerson$.subscribe(person => {
        if (!isNullOrUndefined(person)) {
          this.person = person;
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.fallfuhrungTreeVisibleZeitachse$.subscribe(visible => this.showedTimeLine = visible)
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.treeViewItems$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.afterTreeViewGetDatasource(data);
          this.fallfuhrungTreeSandbox.changeTreeNodeUpdateState(false);
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.rightContentItems$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.updateRightContentItemCaption(data);
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.bNavigatorItems$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.afterTreeViewGetDatasource(data);
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.nodesStatus$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.nodesStatus = data;
          this.displayEdittingIcon(this.nodesStatus);
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.deleteFaPhaseData$.subscribe(data => {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(data.value)) {
          if (data.value) {
            this.getTreeViewItems();
            this.isDeleteFaPhaseSuccess = true;
          }
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.getFaleistungData$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          if (data.length <= 0) {
            return;
          } else {
            this.checkValidateDelete(data[0]);
          }
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.deleteFallverlaufData$.subscribe(data => {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(data.value)) {
          if (data.value) {
            if (this.limitedSelectedActions.length > 1) {
              this.router.navigate([this.limitedSelectedActions[this.limitedSelectedActions.length - 2].url]);
            } else {
              this.router.navigate(['/']);
              this.loadDataFallNavigator();
            }
            this.layoutSandbox.deleteSelectedActionItems(this.stickyItems.find(ele => ele.url === `/${this.selectedItem.url}`));
          }
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.userIDFaLeistung$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.owner = data.userID;
          this.handleLoschenVisible();
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.deleteBaPersonRelation$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.deleteResult = data;
          if (this.deleteResult.result === true) {
            if (!isNullOrUndefined(this.nodeAfterDelete)) {
              this.handleResultDelete(this.nodeAfterDelete);
            }
          }
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.userIDFaPhase$.subscribe(item => {
        if (!isNullOrUndefined(item)) {
          this.owner = item.userID;
          this.handleLoschenVisible();
        }
      })
    );

    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetFaLeistungByBaPersonIDData$.subscribe(result => {
      if (!isNullOrUndefined(result)) {
        if (!isNullOrUndefined(result.datumBis)) {
          this.getMessageInformation(this.ctlFaModulTree, 'FallverlaufBereitsAbgeschlossen', 'Der aktuellste Fallverlauf ist bereits abgeschlossen!');
          return;
        }
        this.faLeistungByBaPersonIDModel = result;
        this.getConfigData();
        this.fallfuhrungTreeSandbox.getCountFaPhaseData(result.faLeistungID);
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetCountFaPhaseData$.subscribe(result => {
      if (!isNullOrUndefined(result) && result.length > 0) {
        this.getCountFaPhaseModel = result[0];
        if (result[0].countOpenBeratung > 0) {
          this.getMessageInformation(this.ctlFaModulTree, 'NichtAbgeschlPhasenVorhanden', 'Es gibt noch nicht abgeschlossene Beratungsphasen!');
          return;
        }
        this.checkValidateBeforeNeueFaPhase();
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetConfigBoolData$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.value)) {
        this.configIntakeErstePhase = result.value;
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetConfigIntData$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.value)) {
        this.configTotalIntakePhasen = result.value;
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetConfigOffeneIntake$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.value)) {
        this.configOffeneIntakePhasen = result.value;
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetConfigTotalBeratungsphasen$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.value)) {
        this.configTotalBeratungsphasen = result.value;
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetFaPhaseByFaLeistungIDData$.subscribe(result => {
      if (!isNullOrUndefined(result) && result.length > 0) {
        this.newDate = result[0].newDate;
      }
    }));
    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetInsertFaPhaseData$.subscribe(result => {
      if (!isNullOrUndefined(result)) {
        if (result.status) {
          this.handleError(result);
        } else {
          this.transfer = true;
          this.idInsertFaPhase = result.id;
          this.addNewNode();
          this.getConfigTransferPhaseUserToFall();
        }
      }
    }));

    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetConfigTransferPhaseUser$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.value)) {
        if (result.value === 1) {
          this.transfer = false;
        }
        this.checkValidateBeforeUpdateFaleistung();
      }
    }));

    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetUpdateFaleistungData$.subscribe(result => {
      if (!isNullOrUndefined(result)) {
        if (result.status) {
          this.handleError(result);
        } else {
          this.checkValidateAfterUpdateFaleistung();
        }
      }
    }));

    this.subscriptions.push(this.fallfuhrungTreeSandbox.GetMessageInformation$.subscribe(result => {
      if (!isNullOrUndefined(result) && !isNullOrUndefined(result.message)) {
        this.showPopupInformation(this.translateService.instant('Fallbearbeitung.Message.TitleInformation'), result.message);
      }
    }));

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.getCountBgFinanzPlan$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.handleCountBgFinanzPlan(data);
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.baPersonIDModulID$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.navigatorByBaPersonIDModulID(data);
        }
      })
    );

    this.subscriptions.push(
      this.dbclickStream$.subscribe((clickedItems: any[]) => {
        if (clickedItems.length >= 2 && clickedItems[0].itemIndex === clickedItems[1].itemIndex) {
          this.fallfuhrungTreeSandbox.getBaPersonIDModulID(clickedItems[0].itemData.faLeistungID);
        } else {
          this.goto(clickedItems[0].itemData);
        }
      })
    );

    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.treeNodeUpdateState$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.getTreeViewItems();
        }
      })
    );
    this.subscriptions.push(
      this.fallfuhrungTreeSandbox.treeFallNavigator$.subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.treeFallNavigator = data;
        }
      })
    );
  }

  ngOnDestroy() {
    this.unregisterEvents();
    this.fallfuhrungTreeSandbox.resetTreeState();
    this.fallfuhrungTreeSandbox.unregisterEvents();
  }

  unregisterEvents() {
    this.subscriptions.forEach(i => i.unsubscribe());
  }

  initDataFromUrl() {
    const urlParameters = this.router.url.split('/');
    this.iconShortName = urlParameters[3];
    this.iconName = urlParameters[4];
    this.baPersonID = urlParameters[5];
    this.zoomOutSelectedIcon(this.iconShortName);
    this.getTreeViewItems();
  }

  handleUrlChange(url) {
    this.updateOrAddSticky(url);
    const urlParameters = url.split('/');
    if (this.iconShortName !== urlParameters[3] || this.baPersonID !== urlParameters[5]) {
      this.iconShortName = urlParameters[3];
      this.iconName = urlParameters[4];
      this.baPersonID = urlParameters[5];
      this.zoomOutSelectedIcon(this.iconShortName);
      this.getTreeViewItems();
      this.fallfuhrungTreeSandbox.getIconMoudle(this.baPersonID, '');
      this.fallfuhrungTreeSandbox.getPersonInfoTitle(this.baPersonID, +getUserIdFromLocalStorage(), +getLanguageCodeNumberFromLocalStorage());
    } else {
      this.selectedItem = this.treeViewDataSource.find(item => `/${item.url}` === url);
      this.treeView.instance.selectItem(this.selectedItem.id);
      this.fallfuhrungTreeSandbox.updateSelectedNode(this.selectedItem);
    }
  }

  zoomOutSelectedIcon(shortName: string): void {
    const oldActivedIcon = document.querySelectorAll('.img-active');
    [].forEach.call(oldActivedIcon, function (el) {
      el.classList.remove('img-active');
    });
    const selectedIcon = document.querySelectorAll('#' + shortName);
    [].forEach.call(selectedIcon, function (el) {
      el.classList.add('img-active');
    });
  }

  getTreeViewItems(): void {
    switch (this.iconShortName) {
      case FallfuhrungTreeConstant.codeB:
        {
          this.treeViewItemsQuery = new BNavigatorItemsQuery();
          this.treeViewItemsQuery.baPersonID = this.baPersonID;
          this.treeViewItemsQuery.modulID = FallfuhrungTreeConstant.ModulIdB;
          this.fallfuhrungTreeSandbox.loadBNavigatorItems(this.treeViewItemsQuery);
        }
        break;
      case FallfuhrungTreeConstant.codeF:
        {
          this.fallfuhrungTreeSandbox.getRightContentItems('DynaPhase');
          this.treeViewItemsQuery = new TreeViewItemsQuery();
          this.treeViewItemsQuery.BaPersonID = this.baPersonID;
          this.treeViewItemsQuery.ModulID = FallfuhrungTreeConstant.ModulIdF;
          this.fallfuhrungTreeSandbox.getTreeViewItems(this.treeViewItemsQuery);
        }
        break;
      case FallfuhrungTreeConstant.codeS:
        {
          this.treeViewItemsQuery = new TreeViewItemsQuery();
          this.treeViewItemsQuery.BaPersonID = this.baPersonID;
          this.treeViewItemsQuery.ModulID = FallfuhrungTreeConstant.ModulIdS;
          this.fallfuhrungTreeSandbox.getTreeViewItems(this.treeViewItemsQuery);
        }
        break;
      case FallfuhrungTreeConstant.codeI: break;
      case FallfuhrungTreeConstant.codeM: break;
      case FallfuhrungTreeConstant.codeA: break;
      case FallfuhrungTreeConstant.codeK: break;
      default: break;
    }
  }

  afterTreeViewGetDatasource(data) {
    if (data.length > 0) {
      switch (this.iconShortName) {
        case FallfuhrungTreeConstant.codeB:
          data.forEach(item => {
            item.url = this.makeUrlForItemB(item);

          });
          this.setDefaultExpandForB(data);
          this.selectedItem = data.find(item => `/${item.url}` === this.router.url);
          if (this.selectedItem) {
            data.find(item => item.id.includes(this.selectedItem.id)).isExpanded = true;
            this.selectedItem.isSelected = true;
          }
          break;
        case FallfuhrungTreeConstant.codeF:
          data = this.makeUrlForItemF(data);
          this.setDefaultExpandForF(data);
          if (data.length > 1) {
            if (this.isDeleteFaPhaseSuccess) {
              this.isDeleteFaPhaseSuccess = false;
              this.selectedItem = data.find(item => item.pkey === this.pkey);
            } else if (this.identity > 0) {
              const nextUrl = `${FallfuhrungTreeConstant.mainUrl}${FallfuhrungTreeConstant.fUrl}${this.selectedItem.baPersonID}/${this.selectedItem.faLeistungID}/${FallfuhrungTreeConstant.Beratungsphase}/${this.idInsertFaPhase}`;
              this.router.navigate([nextUrl]);
              this.selectedItem = data.find(item => `${item.url}` === nextUrl);
            } else {
              this.selectedItem = data.find(item => `/${item.url}` === this.router.url);
            }
          }
          if (this.selectedItem) {
            this.selectedItem.isSelected = true;
            this.selectedItem.isExpanded = true;
          }
          break;
        case FallfuhrungTreeConstant.codeS:
          data.forEach(item => {
            item.url = this.makeUrlForItemS(item);
          });
          this.selectedItem = data.find(item => `/${item.url}` === this.router.url);
          if (this.selectedItem) {
            this.selectedItem.isSelected = true;
            this.selectedItem.isExpanded = true;
          }
          this.setDefaultExpandForS(data);
          break;
        default:
          break;
      }
      this.fallfuhrungTreeSandbox.updateSelectedNode(this.selectedItem);
    }
    this.treeViewDataSource = data;
  }

  makeUrlForItemF(data) {
    let numberOfFallfuhrung = 0;
    data.forEach(item => {
      let targetUrl = FallfuhrungTreeConstant.mainUrl + FallfuhrungTreeConstant.fUrl + this.baPersonID;
      switch (item.className) {
        case FallfuhrungTreeConstant.CtlFaBeratungsperiode:
          numberOfFallfuhrung++;
          targetUrl += numberOfFallfuhrung > 1 ? `/${item.faLeistungID}` : '';
          break;
        case FallfuhrungTreeConstant.CtlFaBeratungsphase:
          targetUrl += `/${item.faLeistungID}/${FallfuhrungTreeConstant.Beratungsphase}/${item.faPhaseID}`;
          break;
        case FallfuhrungTreeConstant.CtlFaAktennotiz:
          targetUrl += `/${item.faLeistungID}/${FallfuhrungTreeConstant.Dokumentation}/${FallfuhrungTreeConstant.Besprechung}`;
          break;
        default:
          targetUrl += `/${FallfuhrungTreeConstant.NotImplementUrl}`;
          break;
      }
      item.url = targetUrl;
    });
    return data;
  }

  makeUrlForItemS(selectedItem: any) {
    let targetUrl = FallfuhrungTreeConstant.mainUrl + FallfuhrungTreeConstant.sUrl + this.baPersonID;
    switch (selectedItem.className) {
      case FallfuhrungTreeConstant.CtlWhLeistung:
        break;
      case FallfuhrungTreeConstant.CtlWhPersonen:
        targetUrl += `/${selectedItem.bgFinanzplanID}`;
        break;
      case FallfuhrungTreeConstant.CtlBgGrundbedarf:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgGrundbedarf}`;
        break;
      case FallfuhrungTreeConstant.CtlBgVermoegen:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgVermoegen}`;
        break;

      case FallfuhrungTreeConstant.CtlBgZulagenEFB:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.BgZulagenEFB}`;
        break;
      // situations case
      case FallfuhrungTreeConstant.CtlBgSilAHVBeitrag:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.AHVBeitrag}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilWiedereingliederung:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilWiedereingliederung}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilTherapieEntzug:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilTherapieEntzug}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilKrankheitBehinderungLeistung:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilKrankheitBehinderungLeistung}`;
        break;
      case FallfuhrungTreeConstant.CtlBgSilSituationsbedingteLeistungen:
        targetUrl += `/${FallfuhrungTreeConstant.WhFinanzplan}/${selectedItem.bgFinanzplanID}/${FallfuhrungTreeConstant.Situation}/${FallfuhrungTreeConstant.BgSilSituationsbedingteLeistungen}`;
        break;
      default:
        targetUrl += `/${FallfuhrungTreeConstant.NotImplementUrl}`;
        break;
    }
    return targetUrl;
  }

  makeUrlForItemB(selectedItem: any) {
    let targetUrl = FallfuhrungTreeConstant.mainUrl + FallfuhrungTreeConstant.bUrl + this.baPersonID;
    switch (selectedItem.className) {
      case FallfuhrungTreeConstant.CtlBaHaushalt:
        break;
      case FallfuhrungTreeConstant.CtlArbeit: {
        targetUrl += `/${FallfuhrungTreeConstant.BaPerson}/${selectedItem.baPersonID}/${FallfuhrungTreeConstant.Arbeit}`;
      }
        break;
      case FallfuhrungTreeConstant.CtlGesundheit: {
        targetUrl += `/${FallfuhrungTreeConstant.BaPerson}/${selectedItem.baPersonID}/${FallfuhrungTreeConstant.Gesundheit}`;
      }
        break;
      case FallfuhrungTreeConstant.CtlBaPerson: {
        targetUrl += `/${FallfuhrungTreeConstant.BaPerson}/${selectedItem.baPersonID}`;
      }
        break;
      case FallfuhrungTreeConstant.CtlBaInstitutionenFachpersonen: {
        targetUrl += `/${FallfuhrungTreeConstant.Institutionen}`;
      }
        break;
      default: break;
    }
    return targetUrl;
  }

  setDefaultExpandForF(data) {
    if (data && data.length > 1) {
      data[1].isExpanded = true;
      const childNodes = data.filter(ele => ele.parentID === data[1].id);
      if (childNodes && childNodes.length > 0) {
        data[data.indexOf((childNodes[0]))].isExpanded = true;
      }
      if (childNodes && childNodes.length > 1) {
        data[data.indexOf((childNodes[1]))].isExpanded = true;
      }
    }
  }

  setDefaultExpandForS(data) {
    if (data && data.length > 0) {
      data[0].isExpanded = true;
      const childNodes = data.filter(ele => ele.parentID === data[0].id);
      if (childNodes && childNodes.length > 0) {
        data[data.indexOf((childNodes[0]))].isExpanded = true;
      }
    }
  }

  setDefaultExpandForB(data) {
    if (data && data.length > 0) {
      data[1].isExpanded = true;
    }
  }

  updateRightContentItemCaption(rightContentItems: RightContentItem[]) {
    rightContentItems.forEach(rightContentItem => {
      if (rightContentItem.value1 != null) {
        switch (rightContentItem.code) {
          case 1:
            this.textDisplayModel.neuesIntake = rightContentItem.value1;
            break;
          case 2:
            this.textDisplayModel.neueBeratungsphase = rightContentItem.value1;
            break;
          default:
            break;
        }
      }
    });
  }

  getIconName(shortName: string): string {
    switch (shortName) {
      case FallfuhrungTreeConstant.codeB:
        return FallfuhrungTreeConstant.Basis;
      case FallfuhrungTreeConstant.codeF:
        return FallfuhrungTreeConstant.Fallfuhrung;
      case FallfuhrungTreeConstant.codeS:
        return FallfuhrungTreeConstant.Sozialhilfe;
      case FallfuhrungTreeConstant.codeI:
        return FallfuhrungTreeConstant.Inkasso;
      case FallfuhrungTreeConstant.codeM:
        return FallfuhrungTreeConstant.Kindes;
      case FallfuhrungTreeConstant.codeA:
        return FallfuhrungTreeConstant.Asyl;
      case FallfuhrungTreeConstant.codeK:
        return FallfuhrungTreeConstant.Arbeit;
      default:
        return FallfuhrungTreeConstant.Basis;
    }
  }

  // short cut ALT + key
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyB) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeB);
    }
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyF) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeF);
    }
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyS) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeS);
    }
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyI) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeI);
    }
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyV) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeM);
    }
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyA) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeA);
    }
    if ((event.altKey || event.metaKey) && event.keyCode === AppEnums.KeyCode.KeyK) {
      event.preventDefault();
      this.onSelectCode(FallfuhrungTreeConstant.codeK);
    }
    if ((event.shiftKey || event.metaKey) && !this.isShiftKeyDown) {
      event.preventDefault();
      this.isShiftKeyDown = true;
    }
  }

  onSelectCode(shortName: string) {
    const iconName = this.getIconName(shortName);
    if (shortName === FallfuhrungTreeConstant.codeB || shortName === FallfuhrungTreeConstant.codeF || shortName === FallfuhrungTreeConstant.codeS) {
      this.router.navigateByUrl(`${FallfuhrungTreeConstant.mainUrl}${shortName}/${iconName}/${this.baPersonID}`);
    }
  }

  toggleVisiblePopover(itemObj) {
    this.isLoschenVisible = false;
    this.isNeueBeratungsphaseVisible = false;
    this.isNeuesIntakeVisible = false;
    if (this.checkIsReadRole('FaNavigNewIntake')) {
      this.isNeuesIntakeVisible = true;
    }
    if (this.checkIsReadRole('FaNavigNewPhase')) {
      this.isNeueBeratungsphaseVisible = true;
    }
    this.isPeriode = itemObj.className === 'CtlFaBeratungsperiode';
    this.isPhase = false;
    if (itemObj.className === 'CtlFaBeratungsphase') {
      const parentNode = this.getParentNodeByParentID(itemObj.parentID);
      this.isPhase = (parentNode != null && parentNode.className === 'CtlFaBeratungsperiode');
    }
    this.owner = -1;
    if (this.isPeriode) {
      this.fallfuhrungTreeSandbox.getUserIDFaLeistung(itemObj.faLeistungID);
    }
    if (this.isPhase) {
      this.fallfuhrungTreeSandbox.getUserIDFaPhase(itemObj.faPhaseID);
    }
    this.isFrmFallZugriffVisible = ((this.isPeriode || this.isPhase) && this.checkIsReadRole('FrmFallZugriff'));
    // Ignore btn [Fallinfo] visible
    if (this.isNeuesIntakeVisible
      || this.isNeueBeratungsphaseVisible
      || this.isLoschenVisible
      || this.isFrmFallZugriffVisible
      || this.isFrmFallInfoVisible) {
      itemObj.visiblePopover = !itemObj.visiblePopover;
    }
  }

  handleLoschenVisible() {
    this.userIsOwner = false;
    if (this.owner === parseInt(getUserIdFromLocalStorage(), 10)) {
      this.userIsOwner = true;
    }
    if (this.isPeriode && this.userIsOwner && this.checkIsReadRole('FaNavigDeletePeriode')) {
      this.isLoschenVisible = true;
    }
    if (this.isPhase && this.userIsOwner && this.checkIsReadRole('FaNavigDeletePhase')) {
      this.isLoschenVisible = true;
    }
  }

  checkIsReadRole(name: any) {
    const isUserHasRight = getRoleSessionStorage(name);
    return !isNullOrUndefined(isUserHasRight) && !isNullOrUndefined(isUserHasRight.IsRead);
  }

  // toggleVisiblePopover - module B
  toggleVisiblePopoverModuleB(e, itemObj) {
    e.stopPropagation();
    this.showPopover = !this.showPopover;
    if (itemObj.className === FallfuhrungTreeConstant.CtlBaPerson && +itemObj.pkey > 2) {
      this.viewEntfernenPerson = true;
      this.entfernenPerson = itemObj.name + FallfuhrungTreeConstant.space + this.translateService.instant('Fallbearbeitung.Textentfernen');
    } else {
      this.viewEntfernenPerson = false;
      this.entfernenPerson = '';
    }
    itemObj.visiblePopoverB = this.showPopover;
  }

  unvisiblePopoverModuleB(itemObj) {
    itemObj.visiblePopoverB = false;
    this.showPopover = false;
  }

  // need update url
  openAddNewForm(itemObj) {
    this.unvisiblePopoverModuleB(itemObj);
  }

  private getParentNodeByParentID(parentID) {
    const parentNodes = this.treeViewDataSource.filter(item => item.id === parentID);
    return parentNodes.length > 0 ? parentNodes[0] : null;
  }

  neuesIntakeMenuItem(itemObj) {
    this.hideRightContent(itemObj);
    this.selectedItem = itemObj;
    this.faPhaseCode = this.NEUS_INTAKE_FAPHASE_CODE;
    this.fallfuhrungTreeSandbox.getFaLeistungByBaPersonIDData(+this.baPersonID);
  }

  neueBeratungsphaseMenuItem(itemObj) {
    this.hideRightContent(itemObj);
    this.selectedItem = itemObj;
    this.faPhaseCode = this.NEUS_BERATUNGSPHASE_FAPHASE_CODE;
    this.fallfuhrungTreeSandbox.getFaLeistungByBaPersonIDData(+this.baPersonID);
  }

  onItemClick(e) {
    if (e.itemData.id.indexOf(FallfuhrungTreeConstant.nodeIdFirstLetter) === 0 ) {
      this.clickStream$.next(e);
    } else {
      this.goto(e.itemData);
    }
  }

  goto(itemData) {
    this.router.navigate([itemData.url]);
  }

  displayEdittingIcon(nodesStatus) {
    if (this.treeView.instance) {
      const items = this.treeView.instance.option('items');
      nodesStatus.forEach(element => {
        const tempNode = items.find(item => `/${item.url}` === element.id);
        if (tempNode) {
          if (element.isEditMode) {
            tempNode.icon = FallfuhrungTreeConstant.edittingIconLocation;
          } else {
            tempNode.icon = '';
          }
        }
      });
    }
  }

  deleteFallverlaufData() {
    this.fallfuhrungTreeSandbox.deleteFallverlaufData(this.selectedItem.faLeistungID);
  }

  deleteFaPhaseData() {
    this.pkey = this.selectedItem.pkey;
    this.fallfuhrungTreeSandbox.deleteFaPhaseData(this.selectedItem.faPhaseID);
  }

  deleteNodeTree(itemObj) {
    this.hideRightContent(itemObj);
    this.selectedItem = itemObj;
    if (itemObj.className === 'CtlFaBeratungsperiode') {
      this.fallfuhrungTreeSandbox.getFaleistungData(itemObj.faLeistungID);
    } else {
      const className = this.getParentNodeByParentID(itemObj.parentID).className ? this.getParentNodeByParentID(itemObj.parentID).className : '';
      if (itemObj.className === 'CtlFaBeratungsphase' && className === 'CtlFaBeratungsperiode') {
        const popupTitle = this.translateService.instant('Fallbearbeitung.Message.TitleConfirm');
        const popupMessage = (this.translateService.instant('Fallbearbeitung.Message.MessageDeletePhaseFirst'))
        + '\'' + itemObj.name + ` ${this.datePipe.transform(itemObj.aufnahme, 'dd.MM.yyyy')}`
        + '\'' + this.translateService.instant('Fallbearbeitung.Message.MessageDeletePhaseLast');
        const popupTextYes = this.translateService.instant('Fallbearbeitung.Message.ComfirmYes');
        const popupTextNo = this.translateService.instant('Fallbearbeitung.Message.ComfirmNo');
        this.showPopupConfirm(popupTitle, popupMessage, () => this.deleteFaPhaseData(), null, true, true, popupTextYes, popupTextNo);
      }
    }
  }

  checkValidateDelete(data: any) {
    if (data.datumBis) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageDatumbis');
      this.fallfuhrungTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.countPhase > 0) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageCountPhaseFirst') + data.countPhase +
        this.translateService.instant('Fallbearbeitung.Message.MessageCountPhaseLast');
      this.fallfuhrungTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.countDatenErfasst > 0) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageCountDatenErfasst');
      this.fallfuhrungTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.hasOtherModul) {
      this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageHasOtherModul');
      this.fallfuhrungTreeSandbox.loadMessage(this.deleteTreeNodeObj);
      return;
    }
    if (data.hasClosedModul) {
      if (!data.hasClosedF) {
        this.deleteTreeNodeObj.message = this.translateService.instant('Fallbearbeitung.Message.MessageHasClosedModul');
        this.fallfuhrungTreeSandbox.loadMessage(this.deleteTreeNodeObj);
        return;
      }
    }
    const popupTitle = this.translateService.instant('Fallbearbeitung.Message.TitleConfirm');
    const popupMessage = (this.translateService.instant('Fallbearbeitung.Message.MessageDeleteFallverlaufFirst'))
    + '\'' + this.selectedItem.name + ` ${this.datePipe.transform(this.selectedItem.aufnahme, 'dd.MM.yyyy')}`
    + '\'' + this.translateService.instant('Fallbearbeitung.Message.MessageDeleteFallverlaufLast');
    const popupTextYes = this.translateService.instant('Fallbearbeitung.Message.ComfirmYes');
    const popupTextNo = this.translateService.instant('Fallbearbeitung.Message.ComfirmNo');
    this.showPopupConfirm(popupTitle, popupMessage, () => this.deleteFallverlaufData(), null, true, true, popupTextYes, popupTextNo);
  }

  showPopupInformation(title, message) {
    this.showPopupConfirm(title, message, null, null, false, false, '', '');
  }

  // Handle B Module
  clickDeleteUserBNode(itemObj) {
    const baPersonRelation = new BapersonRelationQuery();
      baPersonRelation.name = itemObj.name;
      baPersonRelation.baPersonID_1 = +itemObj.baPersonID;
      baPersonRelation.baPersonID_2 = +this.baPersonID;
    this.selectedItem = itemObj;
    this.fallfuhrungTreeSandbox.getCountBgFinanzPlan(baPersonRelation);
    this.unvisiblePopoverModuleB(itemObj);
  }

  showPopupConfirm(title, message, funcComfirmYes, funcComfirmNo, isVisibleYes, isVisibleNo, textYes, textNo) {
    this.initPopUpModel();
    this.popUpModel.title = title;
    this.popUpModel.message = message;
    this.popUpModel.isVisibleYes = isVisibleYes;
    this.popUpModel.isVisibleNo = isVisibleNo;
    this.popUpModel.textYes = textYes;
    this.popUpModel.textNo = textNo;
    this.popUpModel.funcYes = () => {
      if (funcComfirmYes && typeof funcComfirmYes === 'function') {
        funcComfirmYes();
      }
      this.popUpModel.isVisible = false;
    };

    this.popUpModel.funcNo = () => {
      if (funcComfirmNo && typeof funcComfirmNo === 'function') {
        funcComfirmNo();
      }
      this.popUpModel.isVisible = false;
    };
    this.popUpModel.isVisible = true;
  }

  handleCountBgFinanzPlan(data) {
    const popupTitle = this.translateService.instant('Fallbearbeitung.Message.TitleConfirm');
    if (data.count > 0) {
      const type = this.translateService.instant('Fallbearbeitung.Message.TitleInformation');
      this.showPopupConfirm(type, data.message, () => { this.unvisiblePopoverModuleB(this.selectedItem); }, null, false, false, '', '');
    } else {
      this.popUpModel.textYes = this.translateService.instant('Fallbearbeitung.Message.ComfirmYes');
      this.popUpModel.textNo = this.translateService.instant('Fallbearbeitung.Message.ComfirmNo');
      this.showPopupConfirm(popupTitle, data.message, () => { this.deleteUserBNode(); }, () => { this.unvisiblePopoverModuleB(this.selectedItem); }, true, true, this.popUpModel.textYes, this.popUpModel.textNo);
    }
  }

  deleteUserBNode() {
    this.nodeAfterDelete = this.getPositionAfterDeleteModuleB(this.selectedItem);
    const baPersonRelation = new BapersonRelationQuery();
        baPersonRelation.name = this.selectedItem.name;
        baPersonRelation.baPersonID_1 = +this.selectedItem.baPersonID;
        baPersonRelation.baPersonID_2 = +this.baPersonID;
    this.fallfuhrungTreeSandbox.deleteBaPersonRelation(baPersonRelation);
  }

  handleResultDelete(node) {
    if (node) {
      this.goto(node);
      this.getTreeViewItems();
    }
  }

  getPositionAfterDeleteModuleB(itemObjDelete): any {
    const afterNode = this.treeViewDataSource.find(item => item.className === itemObjDelete.className && +item.pkey === +itemObjDelete.pkey + 1);
    if (!isNullOrUndefined(afterNode)) {
      return afterNode;
    }
    return this.treeViewDataSource.find(item => item.className === FallfuhrungTreeConstant.CtlBaInstitutionenFachpersonen);
  }

  initPopUpModel() {
    this.popUpModel = new PopUpModel(
      {
        title: '',
        isVisibleTitle: true,
        isVisible: false,
        message: '',
        textYes: '',
        isVisibleYes: false,
        textNo: '',
        isVisibleNo: false,
        funcYes: null,
        funcNo: null,
      }
    );
  }


  loadDataFallNavigator() {
    this.dataNavigator.dataFallNavigator = 'E' + this.userID;
    this.fallfuhrungTreeSandbox.loadFallNavigator(this.dataNavigator);
  }

  checkValidateBeforeNeueFaPhase() {
    this.countIntake = this.getCountFaPhaseModel.countIntake;
    this.countOpenIntake = this.getCountFaPhaseModel.countOpenIntake;
    this.countBeratung = this.getCountFaPhaseModel.countBeratung;
    if (this.faPhaseCode === 1) {
      if (this.configTotalIntakePhasen > -1 && this.countIntake >= this.configTotalIntakePhasen) {
        if (this.configTotalIntakePhasen === 0) {
          this.getMessageInformation(this.ctlFaModulTree, 'KeineIntakePhaseErlaubt', 'Es dürfen keine Intake-Phasen erstellt werden.');
          return;
        }
        this.getMessageInformation(this.ctlFaModulTree, 'MaximaleAnzahlIntakePhasenErreicht', 'Es kann keine weitere Intake-Phase erstellt werden. Die maximale Anzahl Intake-Phasen ist erreicht.');
        return;
      }
      switch (this.countOpenIntake) {
        case 0:
          break;

        case 1:
          if (this.configOffeneIntakePhasen === 1) {
            this.getMessageInformation(this.ctlFaModulTree, 'IntakePhaseVorhanden1', 'Es gibt bereits eine offene Intake-Phase!');
            return;
          }
          this.getMessageInformation(this.ctlFaModulTree, 'IntakePhaseVorhanden2', 'Achtung, es gibt bereits eine offene Intake-Phase!');
          break;

        case 2:
          this.getMessageInformation(this.ctlFaModulTree, '2OffeneIntakePhasen', 'Es gibt bereits 2 offene Intake-Phasen!');
          return;

        default:
          return;
      }
    } else {
      if (this.configTotalBeratungsphasen > -1 && this.countBeratung >= this.configTotalBeratungsphasen) {
        if (this.configTotalBeratungsphasen === 0) {
          this.getMessageInformation(this.ctlFaModulTree, 'KeineBeratungsphaseErlaubt', 'Es dürfen keine Beratungsphasen erstellt werden.');
          return;
        }
        this.getMessageInformation(this.ctlFaModulTree, 'MaximaleAnzahlBeratungsphasenErreicht', 'Es kann keine weitere Beratungsphase erstellt werden. Die maximale Anzahl Beratungsphasen ist erreicht.');
        return;
      }

      if (this.configIntakeErstePhase && this.countIntake === 0) {
        this.getMessageInformation(this.ctlFaModulTree, 'ErstePhaseMussIntakeSein', 'Die erste Phase muss eine Intake-Phase sein.');
        return;
      }

      if (this.countOpenIntake > 0) {
        this.getMessageInformation(this.ctlFaModulTree, 'IntakePhaseNichtAbgeschlossen', 'Es gibt noch nicht abgeschlossene Intake-Phasen!');
        return;
      }

    }
    this.neueFaPhase();
  }

  neueFaPhase() {
    this.getDataForInsertFaPhase();
    this.fallfuhrungTreeSandbox.insertFaPhaseData(this.insertFaPhaseQueryModel);
  }

  getDataForInsertFaPhase() {
    if (this.newDate < new Date()) {
      this.newDate = new Date();
    }
    this.insertFaPhaseQueryModel.FaLeistungID = this.faLeistungByBaPersonIDModel.faLeistungID;
    this.insertFaPhaseQueryModel.FaPhaseCode = this.faPhaseCode;
    this.insertFaPhaseQueryModel.DatumVon = this.newDate;
  }

  getConfigData() {
    this.modelQueryConfigToTalIntake.keyPath = 'System\\Fallfuehrung\\TotalIntakePhasen';
    this.modelQueryConfigToTalIntake.defaultValue = -1;
    this.modelQueryConfigOffeneIntake.keyPath = 'System\\Fallfuehrung\\OffeneIntakePhasen';
    this.modelQueryConfigOffeneIntake.defaultValue = 1;
    this.modelQueryConfigTotalBeratungsphasen.keyPath = 'System\\Fallfuehrung\\TotalBeratungsphasen';
    this.modelQueryConfigTotalBeratungsphasen.defaultValue = -1;
    this.modelQueryConfigIntakeErstePhase.keyPath = 'System\\Fallfuehrung\\IntakeErstePhase';
    this.modelQueryConfigIntakeErstePhase.defaultValue = false;
    this.fallfuhrungTreeSandbox.getConfigBoolData(this.modelQueryConfigIntakeErstePhase);
    this.fallfuhrungTreeSandbox.getConfigIntData(this.modelQueryConfigToTalIntake);
    this.fallfuhrungTreeSandbox.getConfigOffeneIntake(this.modelQueryConfigOffeneIntake);
    this.fallfuhrungTreeSandbox.getConfigTotalBeratungsphasen(this.modelQueryConfigTotalBeratungsphasen);
    this.fallfuhrungTreeSandbox.getFaPhaseByFaLeistungIDData(this.selectedItem.faLeistungID);
  }

  getConfigTransferPhaseUserToFall() {
    this.modelQueryConfigTransferPhaseUser.keyPath = 'System\\Fallfuehrung\\TransferPhaseUserToFall';
    this.modelQueryConfigTransferPhaseUser.defaultValue = 1;
    this.fallfuhrungTreeSandbox.getConfigTransferPhaseUser(this.modelQueryConfigTransferPhaseUser);
  }

  checkValidateBeforeUpdateFaleistung() {
    if (this.transfer === true) {
      this.updateFaLeistungQueryModel.faLeistungID = this.faLeistungByBaPersonIDModel.faLeistungID;
      this.fallfuhrungTreeSandbox.updateFaleistungData(this.updateFaLeistungQueryModel);
    }
  }

  checkValidateAfterUpdateFaleistung() {
    this.identity = -1;
    if (this.idInsertFaPhase > 0) {
      this.identity = this.idInsertFaPhase;
    }
    this.getTreeViewItems();
  }

  handleError(data) {
    const body = JSON.parse(data._body);
    const message = body.message.toString();
    this.showPopupInformation(this.translateService.instant('Fallbearbeitung.Message.TitleInformation'), message);
  }

  getMessageInformation(maskName, messageName, defaultText) {
    this.modelQueryMessage.maskName = maskName;
    this.modelQueryMessage.messageName = messageName;
    this.modelQueryMessage.defaultText = defaultText;
    this.fallfuhrungTreeSandbox.getMessageInformation(this.modelQueryMessage);
  }

  addNewNode() {
    this.newFaPhaseAddition = {
      faPhaseID: this.idInsertFaPhase,
      baPersonID: this.selectedItem.baPersonID
    };
    this.fallfuhrungTreeSandbox.addNewNode(this.newFaPhaseAddition);
  }

  navigatorByBaPersonIDModulID(data) {
    let url = FallfuhrungTreeConstant.mainUrl;
    switch (data.modulID) {
      case FallfuhrungTreeConstant.ModulIdB:
        url += FallfuhrungTreeConstant.bUrl + data.baPersonID;
        break;
      case FallfuhrungTreeConstant.ModulIdF:
      case FallfuhrungTreeConstant.ModulIdFs:
        url += FallfuhrungTreeConstant.fUrl + data.baPersonID;
        break;
      case FallfuhrungTreeConstant.ModulIdS:
        url += FallfuhrungTreeConstant.sUrl + data.baPersonID;
        break;
      default:
        break;
    }
    if (url !== FallfuhrungTreeConstant.mainUrl) {
      this.newBaPerson = this.treeFallNavigator.find(ele => ele.baPersonId === data.baPersonID);
      this.fallfuhrungTreeSandbox.getIconMoudle(data.baPersonID, '');
      this.router.navigate([url]);
    }
  }

  updateOrAddSticky(endUrl) {
    if (endUrl.includes(FallfuhrungTreeConstant.NotImplementUrl)) {
      return;
    }
    const endUrlParams = endUrl.split('/');
    let matchedStickyItem;
    this.stickyItems.forEach(element => {
      const stickyItemParams = element.url.split('/');
      if (stickyItemParams.length > 5 && endUrlParams[5] === stickyItemParams[5]) {
        matchedStickyItem = element;
        return;
      }
    });
    if (matchedStickyItem) {
      this.layoutSandbox.updateOrAddSticky(matchedStickyItem.data, endUrl);
    } else if (endUrlParams[2] === 'fallbearbeitung' && this.newBaPerson) {
      this.layoutSandbox.updateOrAddSticky(this.newBaPerson, endUrl);
    }
  }

  hideRightContent(itemObj) {
    itemObj.visiblePopover = false;
  }

  fallzugriff(itemObj) {
    this.hideRightContent(itemObj);
  }
}
