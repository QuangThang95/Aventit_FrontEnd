import { ViewChild, OnInit, Injector, AfterViewInit, Input, Component, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { BarPerSon, LOVName, BerufSuchen, InstitutionSuchen } from '../../models';

import 'devextreme-intl';
import { locale } from 'devextreme/localization';
import { CommonConstant } from '@shared/common/constant.common';
import { getUserIdFromLocalStorage, getLanguageCodeNumberFromLocalStorage } from '@shared/utilites';
import { Router, ActivatedRoute } from '@angular/router';
import { DxDataGridComponent, DxDateBoxComponent, DxDropDownBoxComponent, DxValidationGroupComponent, DxNumberBoxComponent } from 'devextreme-angular';
import { parse } from '@shared/utilites/currencyHelper';
import * as UtilityHelper from '@shared/utilites/utilityHelpers';
import { DxSelectBoxComponent } from 'devextreme-angular/ui/select-box';
import { BaseComponent } from '@shared/components/base.component';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from '@shared/utilites/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { ArbeitSandbox } from '@app/kiss4-basis/arbeit/arbeit.sandbox';
import { PopUpModel } from '@shared/models/shared/popup-confirm.model';
import { AppEnums } from '@shared/AppEnum';
import { FallfuhrungTreeSandbox } from '@app/kiss4-fallfuhrung/fallfuhrung-tree/fallfuhrung-tree.sandbox';
import { Subject } from 'rxjs';
import { ArbeitConstant, ErwerbssituationsCode } from '@shared/common/arbeit.common';


@Component({
  selector: 'app-arbeit-edit',
  templateUrl: './arbeit-edit.component.html',
  styleUrls: ['./arbeit-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArbeitEditComponent extends BaseComponent implements OnInit, AfterViewInit {
  // Datasouce
  @Input() arbeitModel: BarPerSon = new BarPerSon();
  @Input() berufSuchens: BerufSuchen[];
  @Input() institutionSuchens: InstitutionSuchen[];
  @Input() arbeitErwerbssituation1: LOVName[];
  @Input() arbeitErwerbssituation2: LOVName[];
  @Input() arbeitErwerbssituation3: LOVName[];
  @Input() arbeitErwerbssituation4: LOVName[];
  @Input() arbeitBeschaeftigungsgrad: LOVName[];
  @Input() arbeitGrundteilzeit1: LOVName[];
  @Input() arbeitGrundteilzeit2: LOVName[];
  @Input() arbeitBranche: LOVName[];
  @Input() arbeitAusbildungstyp: LOVName[];
  @Input() arbeitIntegrationsstand: LOVName[];
  @Input() arbeitNichtbekannt: LOVName[];

  @ViewChild('gridErlernterBeruf') gridErlernterBeruf: DxDataGridComponent;
  @ViewChild('gridBeruf') gridBeruf: DxDataGridComponent;
  @ViewChild('gridArbeitgeber') gridArbeitgeber: DxDataGridComponent;
  @ViewChild('erwerbssituationStatus1Code') erwerbssituationStatus1Code: DxSelectBoxComponent;
  @ViewChild('stempelDatum') stempelDatum: DxDateBoxComponent;
  @ViewChild('ausgesteuertDatum') ausgesteuertDatum: DxDateBoxComponent;
  @ViewChild('validationGroup') validationGroup: DxValidationGroupComponent;
  @ViewChild('erlernterBeruf') erlernterBeruf: DxDropDownBoxComponent;
  @ViewChild('beruf') beruf: DxDropDownBoxComponent;
  @ViewChild('arbeitgeber') arbeitgeber: DxDropDownBoxComponent;
  @ViewChild('arbeitszeit') arbeitszeit: DxNumberBoxComponent;

  caret: any;
  arbeitLastModel: BarPerSon = new BarPerSon();
  titleForm: string;
  isgridErlernterBeruf = false;
  isgridBeruf = false;
  isgridArbeitgeber = false;
  popUpModel: PopUpModel;
  isViewMode = true;
  isVisible = false;
  isUpdateConflicted = false;
  selectedKeysErlernterBeruf = [];
  selectedKeysBeruf = [];
  selectedKeysArbeitgeber = [];
  currentAccessKey = 0;
  isFieldChanged = false;
  keyFocus: string;
  caretArbeitszeit: any;
  caretWieOftArbeitslos: any;
  currencyArbeitszeit: any;
  messageCanDeactive: any;
  selectedID: any;
  dateFormat = CommonConstant.FORMAT_DATE;
  dateLenght = ArbeitConstant.dateLenght;
  minDate = ArbeitConstant.minDate;
  maxDate =  ArbeitConstant.maxDate;
  arbeitszeitFormat = ArbeitConstant.arbeitszeitFormat;
  wieOftArbeitslosFormat = ArbeitConstant.wieOftArbeitslosFormat;
  maxWieOftArbeitslos = ArbeitConstant.maxWieOftArbeitslos;
  minWieOftArbeitslos = ArbeitConstant.minWieOftArbeitslos;
  listBtn = [];
  isShowServerSaveError = false;
  itemsIsDisable = {
    erwerbssituationStatus1Code: false,
    erwerbssituationStatus2Code: false,
    erwerbssituationStatus3Code: false,
    erwerbssituationStatus4Code: false,
    beschaeftigungsGrad: false,
    arbeitszeit: false,
    asVariableArbeitszeit: false,
    stempelDatum: false,
    ausgesteuertUnbekannt: false,
    ausgesteuertDatum: false,
    grundTeilzeitarbeit1Code: false,
    grundTeilzeitarbeit2Code: false
  };
  focusTextarea = false;
  editor: any;
  froalaEditorConfig = {
    heightMin: 150,
    height: 300,
    events: {
      'froalaEditor.initialized': (e, editor) => {
        this.editor = editor;
      },
      'froalaEditor.focus': () => {
        this.focusTextarea = true;
      },
      'froalaEditor.blur': () => {
        this.focusTextarea = false;
      }
    }
  };

  customizeBtn = [
    {
      text: 'Arbeit.Button.Edit',
      visible: true,
      disabled: false,
      name: ArbeitConstant.Edit
    },
    {
      text: 'Arbeit.Button.Save',
      visible: false,
      disabled: false,
      name: ArbeitConstant.Save
    },
    {
      text: 'Arbeit.Button.Cancel',
      visible: false,
      disabled: false,
      name: ArbeitConstant.Cancel
    }
  ];
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
  widthNumberAndDateBox = CommonConstant.WidthNumberAndDateBox;
  barPerSonID: any;
  arbeitMinNumber = ArbeitConstant.arbeitMinNumber;
  arbeitMaxNumber = ArbeitConstant.arbeitMaxNumber;
  updateDataAfterConcurrentcy = false;
  private subscriptions: Array<Subscription> = [];
  constructor(injector: Injector, public arbeitsSandbox: ArbeitSandbox,
    public utilService: UtilService,
    private route: ActivatedRoute,
    private router: Router,
    public translateService: TranslateService,
    public fallfuhrungTreeSandbox: FallfuhrungTreeSandbox) {
    super(injector);
    locale(UtilityHelper.getLanguageCodeFromLocalStorage());
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initIsDisableModel();
    if (this.barPerSonID) {
      this.arbeitsSandbox.getBapersonArbeit({ BaPersonID: this.barPerSonID });
    }
    this.getLookupCombobox();
    this.messageCanDeactive = this.translateService.instant('Arbeit.Message.ConfirmDeactive');
  }
  getPersonInfoTitle() {
    this.fallfuhrungTreeSandbox.getPersonInfoTitle(this.barPerSonID, +getUserIdFromLocalStorage(), +getLanguageCodeNumberFromLocalStorage());
  }

  initIsDisableModel() {
    this.itemsIsDisable = {
      ...this.itemsIsDisable,
      beschaeftigungsGrad: false,
      arbeitszeit: false,
      asVariableArbeitszeit: false,
      stempelDatum: false,
      ausgesteuertUnbekannt: false,
      ausgesteuertDatum: false,
    };
  }

  initModel(model) {
    this.arbeitModel = Object.assign({}, model);
    this.arbeitLastModel = Object.assign({}, model);
    this.minDate = new Date(1753, 0, 1);
    this.maxDate = new Date(9999, 11, 31);
  }

  getLookupCombobox() {
    this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLErwerbssituation);
  }

  hanleFillDataCombox(value) {
    switch (value[0].lovname) {
      case ArbeitConstant.URLErwerbssituation:
        this.arbeitErwerbssituation1 = value;
        this.arbeitErwerbssituation2 = value;
        this.arbeitErwerbssituation3 = value;
        this.arbeitErwerbssituation4 = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLBeschaeftigungsgrad);
        break;
      case ArbeitConstant.URLBeschaeftigungsgrad:
        this.arbeitBeschaeftigungsgrad = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLGrundteilzeit);
        break;
      case ArbeitConstant.URLGrundteilzeit:
        this.arbeitGrundteilzeit1 = value;
        this.arbeitGrundteilzeit2 = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLBranche);
        break;
      case ArbeitConstant.URLBranche:
        this.arbeitBranche = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLAusbildungstyp);
        break;
      case ArbeitConstant.URLAusbildungstyp:
        this.arbeitAusbildungstyp = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLIntegrationsstand);
        break;
      case ArbeitConstant.URLIntegrationsstand:
        this.arbeitIntegrationsstand = value;
        this.arbeitsSandbox.getLOVNameArbeit(ArbeitConstant.URLNichtbekannt);
        break;
      case ArbeitConstant.URLNichtbekannt:
        this.arbeitNichtbekannt = value;
        break;
      default:
        break;
    }
  }

  onPresskey(event, field) {
    switch (field) {
      case ArbeitConstant.Arbeitszeit:
        {
          if (event.event.keyCode >= ArbeitConstant.codeA && event.event.keyCode <= ArbeitConstant.codeZ) {
            return;
          } else {
            event.event.preventDefault();
          }
          break;
        }
      case ArbeitConstant.WieOftArbeitslos:
        {
          if (event.event.keyCode >= ArbeitConstant.codeA && event.event.keyCode <= ArbeitConstant.codeZ) {
            this.checkWieMaxLenght(event.event);
            return;
          } else {
            event.event.preventDefault();
          }
        }
        break;
      default:
        break;
    }
  }

  onKeyDownCurrency(e) {
    this.checkMoveFocus(e);
  }

  onValueChanged($event, fieldData) {
    switch (fieldData) {
      case ArbeitConstant.ErwerbssituationStatus1Code:
      case ArbeitConstant.ErwerbssituationStatus2Code:
      case ArbeitConstant.ErwerbssituationStatus3Code:
      case ArbeitConstant.ErwerbssituationStatus4Code:
        this.hanleItemIsDisable($event.value);
        break;
      case ArbeitConstant.BeschaeftigungsGradCode:
        this.hanleIsDisableErwer4Code($event.value);
        break;
      case ArbeitConstant.Arbeitszeit:
        if ($event.event) {
          this.arbeitModel[fieldData] = $event.value;
        }
        break;
      case ArbeitConstant.WieOftArbeitslos:
        if ($event.event) {
          this.arbeitModel[fieldData] = $event.value;
        }
        break;
      default:
        break;
    }
  }
  checkWieMaxLenght(event) {
    const value = parse(event.target.value);
    if (this.arbeitLastModel.wieOftArbeitslos) {
      if (value.length === ArbeitConstant.wieMaxUpdate) {
        event.preventDefault();
        return false;
      }
    } else {
      if (value.length === ArbeitConstant.wieMaxAddNew) {
        event.preventDefault();
        return false;
      }
    }
    return true;
  }

  hanleItemIsDisable(code) {
    switch (code) {
      case ErwerbssituationsCode.Selbstandig:
      case ErwerbssituationsCode.AngestelltInDerEigenenFirma:
      case ErwerbssituationsCode.RegelmaessigAngestellt:
      case ErwerbssituationsCode.ZeitlichBefristeterVertrag:
      case ErwerbssituationsCode.ArbeitAufAbruf:
      case ErwerbssituationsCode.Gelegenheitsarbeit:
      case ErwerbssituationsCode.MitarbeitendesFamilienmitglied:
      case ErwerbssituationsCode.InDerLehre:
      case ErwerbssituationsCode.AnderesErwerbstaetig:
      case ErwerbssituationsCode.Arbeitsintegrationsprogramm:
      case ErwerbssituationsCode.BeschaeftigungsprogrammFuerAusgesteuerte:
      case ErwerbssituationsCode.Arbeitsverbot:
        this.itemsIsDisable.arbeitszeit = false;
        this.itemsIsDisable.asVariableArbeitszeit = false;
        this.itemsIsDisable.beschaeftigungsGrad = false;
        this.itemsIsDisable.stempelDatum = true;
        this.itemsIsDisable.ausgesteuertUnbekannt = true;
        this.itemsIsDisable.ausgesteuertDatum = true;
        this.itemsIsDisable = {
          ...this.itemsIsDisable
        };
        break;
      case ErwerbssituationsCode.AufStellensucheBeimArbeitsamtGemeldet:
      case ErwerbssituationsCode.AufStellensucheNichtBeimArbeitsamtGemeldet:
      case ErwerbssituationsCode.AnderesAufArbeitssuche:
        this.itemsIsDisable.arbeitszeit = true;
        this.itemsIsDisable.asVariableArbeitszeit = true;
        this.itemsIsDisable.beschaeftigungsGrad = true;
        this.arbeitModel.beschaeftigungsGradCode = null;
        this.itemsIsDisable.stempelDatum = false;
        this.itemsIsDisable.ausgesteuertUnbekannt = false;
        this.itemsIsDisable.ausgesteuertDatum = false;
        break;
      case ErwerbssituationsCode.InAusbildungOhneLehrlinge:
      case ErwerbssituationsCode.HaushaltFamiliäreGruende:
      case ErwerbssituationsCode.Rentner:
      case ErwerbssituationsCode.VoruebergehendArbeitsunfaehig:
      case ErwerbssituationsCode.Dauerinvaliditaet:
      case ErwerbssituationsCode.KeineChanceAufDemArbeitsmarkt:
      case ErwerbssituationsCode.AnderesNichtErwerbstaetig:
      case ErwerbssituationsCode.NichtFestgestellt:
        this.itemsIsDisable.arbeitszeit = true;
        this.itemsIsDisable.asVariableArbeitszeit = true;
        this.itemsIsDisable.beschaeftigungsGrad = true;
        this.arbeitModel.beschaeftigungsGradCode = null;
        this.itemsIsDisable.stempelDatum = true;
        this.itemsIsDisable.ausgesteuertUnbekannt = true;
        this.itemsIsDisable.ausgesteuertDatum = true;
        break;
      default:
        this.initIsDisableModel();
        break;
    }
  }

  hanleIsDisableErwer4Code(code) {
    if (code != null && (code === ErwerbssituationsCode.AngestelltInDerEigenenFirma
      || code === ErwerbssituationsCode.RegelmaessigAngestellt
      || code === ErwerbssituationsCode.ZeitlichBefristeterVertrag
      || code === ErwerbssituationsCode.ArbeitAufAbruf
      || code === ErwerbssituationsCode.NichtFestgestellt
    )) {
      this.itemsIsDisable.grundTeilzeitarbeit1Code = false;
      this.itemsIsDisable.grundTeilzeitarbeit2Code = false;
    } else {
      this.itemsIsDisable.grundTeilzeitarbeit1Code = true;
      this.itemsIsDisable.grundTeilzeitarbeit2Code = true;
    }
  }

  parseIntArbeitModel() {
    if (this.arbeitModel.wieOftArbeitslos && this.arbeitModel.arbeitszeit) {
      this.arbeitModel.wieOftArbeitslos = (this.arbeitModel.wieOftArbeitslos);
      this.arbeitModel.arbeitszeit = (this.arbeitModel.arbeitszeit);
    }
  }

  selectContentReady(e) {
    const dataSource = e.component.option('dataSource');
    if (!dataSource) {
      return;
    }
    if (dataSource.length <= 0 || Object.keys(dataSource[0]).length === 0) {
      return;
    }
    dataSource.forEach((element, index) => {
      if (!element || (element && !element.text)) {
        dataSource.splice(index, 1);
      }
    });
    dataSource.splice(0, 0, {});
    e.component.option('dataSource', dataSource);
  }

  onSelectOpened(e) {
    const dataSource = e.component.option('dataSource');
    if (!dataSource) {
      return;
    }
    if (dataSource.length <= 0 || Object.keys(dataSource[0]).length === 0) {
      return;
    }
    dataSource.forEach((element, index) => {
      if (!element || (element && !element.text)) {
        dataSource.splice(index, 1);
      }
    });
    dataSource.splice(0, 0, {code: null, text: ''});
    e.component.option('dataSource', dataSource);
  }

  isArbeitModelChanged() {
    return (this.arbeitModel.baPersonID !== this.arbeitLastModel.baPersonID
      || this.arbeitModel.erwerbssituationStatus1Code !== this.arbeitLastModel.erwerbssituationStatus1Code
      || this.arbeitModel.erwerbssituationStatus2Code !== this.arbeitLastModel.erwerbssituationStatus2Code
      || this.arbeitModel.erwerbssituationStatus3Code !== this.arbeitLastModel.erwerbssituationStatus3Code
      || this.arbeitModel.erwerbssituationStatus4Code !== this.arbeitLastModel.erwerbssituationStatus4Code
      || this.arbeitModel.beschaeftigungsGradCode !== this.arbeitLastModel.beschaeftigungsGradCode
      || this.arbeitModel.grundTeilzeitarbeit1Code !== this.arbeitLastModel.grundTeilzeitarbeit1Code
      || this.arbeitModel.grundTeilzeitarbeit2Code !== this.arbeitLastModel.grundTeilzeitarbeit2Code
      || this.arbeitModel.brancheCode !== this.arbeitLastModel.brancheCode
      || this.arbeitModel.erlernterBerufCode !== this.arbeitLastModel.erlernterBerufCode
      || this.arbeitModel.berufCode !== this.arbeitLastModel.berufCode
      || this.arbeitModel.baInstitutionID !== this.arbeitLastModel.baInstitutionID
      || this.arbeitModel.hoechsteAusbildungCode !== this.arbeitLastModel.hoechsteAusbildungCode
      || this.arbeitModel.abgebrochenAusbildungCode !== this.arbeitLastModel.abgebrochenAusbildungCode
      || this.arbeitModel.anstellungCode !== this.arbeitLastModel.anstellungCode
      || this.arbeitModel.isVariableArbeitszeit !== this.arbeitLastModel.isVariableArbeitszeit
      || this.arbeitModel.stempelDatum !== this.arbeitLastModel.stempelDatum
      || this.arbeitModel.ausgesteuertUnbekanntCode !== this.arbeitLastModel.ausgesteuertUnbekanntCode
      || this.arbeitModel.ausgesteuertDatum !== this.arbeitLastModel.ausgesteuertDatum
      || this.arbeitModel.bemerkung !== this.arbeitLastModel.bemerkung
      || this.arbeitModel.integrationsstandCode !== this.arbeitLastModel.integrationsstandCode
      || this.arbeitModel.finanziellUnabhaengig !== this.arbeitLastModel.finanziellUnabhaengig
      || this.arbeitModel.beruf !== this.arbeitLastModel.beruf
      || this.arbeitModel.erlernterBeruf !== this.arbeitLastModel.erlernterBeruf
      || this.arbeitModel.arbeitgeber !== this.arbeitLastModel.arbeitgeber
      || this.arbeitModel.geschlechtCode !== this.arbeitLastModel.geschlechtCode)
      || this.arbeitModel.arbeitszeit !== this.arbeitLastModel.arbeitszeit
      || this.arbeitModel.wieOftArbeitslos !== this.arbeitLastModel.wieOftArbeitslos ? true : false;
  }

  gridOnClick($event, value) {
    const data = $event.data;
    switch (value) {
      case ArbeitConstant.ErlernterBeruf:
        this.arbeitModel.erlernterBerufCode = data.baBerufID;
        this.arbeitModel.erlernterBeruf = data.text;
        this.isgridErlernterBeruf = false;
        break;
      case ArbeitConstant.Beruf:
        this.arbeitModel.berufCode = data.baBerufID;
        this.arbeitModel.beruf = data.text;
        this.isgridBeruf = false;
        break;
      case ArbeitConstant.Arbeitgeber:
        this.arbeitModel.baInstitutionID = data.baInstitutionID;
        this.arbeitModel.arbeitgeber = data.name;
        this.isgridArbeitgeber = false;
        break;
      default:
        break;
    }
  }

  institutionContentReady(e) {
    const foundIndex = this.institutionSuchens ? this.institutionSuchens.findIndex(i => +i.baInstitutionID === +this.arbeitModel.baInstitutionID) : 0;
    const index = foundIndex === -1 ? 0 : foundIndex;
    e.component.selectRowsByIndexes(index);
  }

  erlernterBerufonContentReady(e) {
    const foundIndex = this.berufSuchens ? this.berufSuchens.findIndex(i => +i.baBerufID === +this.arbeitModel.erlernterBerufCode) : 0;
    const index = foundIndex === -1 ? 0 : foundIndex;
    e.component.selectRowsByIndexes(index);
  }

  berufonContentReady(e) {
    const foundIndex = this.berufSuchens ? this.berufSuchens.findIndex(i => +i.baBerufID === +this.arbeitModel.berufCode) : 0;
    const index = foundIndex === -1 ? 0 : foundIndex;
    e.component.selectRowsByIndexes(index);
  }

  spracheKeyDown(e, field) {
    if (!this.isgridErlernterBeruf && !this.isgridBeruf && !this.isgridArbeitgeber) {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        e.event.preventDefault();
        e.component.open();
      }
      this.checkMoveFocus(e);
    } else {
      let gridDropdownComponent;
      switch (field) {
        case ArbeitConstant.ErlernterBeruf:
          gridDropdownComponent = this.gridErlernterBeruf;
          if (e.event.keyCode === AppEnums.KeyCode.KeyEnter || e.event.keyCode === AppEnums.KeyCode.KeyF4) {
            this.isgridErlernterBeruf = false;
            this.erlernterBeruf.instance.focus();
          }
          break;
        case ArbeitConstant.Beruf:
          gridDropdownComponent = this.gridBeruf;
          if (e.event.keyCode === AppEnums.KeyCode.KeyEnter || e.event.keyCode === AppEnums.KeyCode.KeyF4) {
            this.isgridBeruf = false;
            this.beruf.instance.focus();
          }
          break;
        case ArbeitConstant.Arbeitgeber:
          gridDropdownComponent = this.gridArbeitgeber;
          if (e.event.keyCode === AppEnums.KeyCode.KeyEnter || e.event.keyCode === AppEnums.KeyCode.KeyF4) {
            this.isgridArbeitgeber = false;
            this.arbeitgeber.instance.focus();
          }
          break;
        default:
          break;
      }
      if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey || e.event.keyCode === AppEnums.KeyCode.UpArrowKey) {
        this.hanleRowKeyGrid(e.event, gridDropdownComponent, this.institutionSuchens);
      }
      if (e.event.keyCode === AppEnums.KeyCode.KeyTab) {
        this.isgridErlernterBeruf = this.isgridBeruf = this.isgridArbeitgeber = false;
        if (!e.event.shiftKey) {
          this.moveFocus(true);
        } else {
          this.moveFocus(false);
        }
      }
    }
  }

  onFocusIn(element, field: string) {
    this.keyFocus = field;
    if (element.accessKey) {
      this.currentAccessKey = element.accessKey;
    }
  }

  // Arrow-key
  moveFocus(isNext: boolean) {
    const tagNames = ['input', 'dx-check-box'];
    for (const tagName of tagNames) {
      const elems = document.getElementsByTagName(tagName);
      for (const el of Array.from(elems)) {
        if (isNext) {
          if ((+(el as HTMLElement).accessKey === this.currentAccessKey + 1 || +(el as HTMLElement).hasAttribute('accesskey') === this.currentAccessKey + 1)
            && +(el as HTMLElement).hasAttribute('disabled') !== 1) {
            this.currentAccessKey += 1;
            setTimeout(() => {
              (el as HTMLElement).focus();
            });
            return;
          }
        } else {
          if ((+(el as HTMLElement).accessKey === this.currentAccessKey - 1 || +(el as HTMLElement).hasAttribute('accesskey') === this.currentAccessKey + 1)
            && +(el as HTMLElement).hasAttribute('disabled') !== 1) {
            this.currentAccessKey = Math.max(this.currentAccessKey - 1, 1);
            setTimeout(() => {
              (el as HTMLElement).focus();
            });
            return;
          }
        }
      }
    }
  }

  checkMoveFocus(e) {
    if (e.event.keyCode === AppEnums.KeyCode.UpArrowKey || e.event.key === ArbeitConstant.ArrowUp) {
      this.moveFocus(false);
    }
    if (e.event.keyCode === AppEnums.KeyCode.DownArrowKey || e.event.key === ArbeitConstant.ArrowDown) {
      this.moveFocus(true);
    }
  }

  // Onkey Down
  onKeyDown(e) {
    if (!(e.component.option('opened'))) {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        e.event.preventDefault();
        e.component.open();
        return;
      } else {
        e.event.keyCode = null;
        e.event.which = null;
      }
    } else {
      if (e.event.keyCode === AppEnums.KeyCode.KeyF4) {
        e.event.preventDefault();
        e.component.close();
      }
    }
  }

  checkFieldFocus(value) {
    return value === ArbeitConstant.ErwerbssituationStatus1Code
      || ArbeitConstant.ErwerbssituationStatus2Code
      || ArbeitConstant.ErwerbssituationStatus3Code
      || ArbeitConstant.ErwerbssituationStatus4Code
      || ArbeitConstant.BeschaeftigungsGradCode
      || ArbeitConstant.GrundTeilzeitarbeit1Code
      || ArbeitConstant.GrundTeilzeitarbeit2Code
      || ArbeitConstant.BrancheCode
      || ArbeitConstant.HoechsteAusbildungCode
      || ArbeitConstant.AbgebrochenAusbildungCode
      || ArbeitConstant.IntegrationsstandCode
      || ArbeitConstant.AusgesteuertUnbekanntCode
      || ArbeitConstant.AusgesteuertDatum
      || ArbeitConstant.StempelDatum
      ? true : false;
  }

  hanleRowKeyGrid(event, gridInstance, dataSource = []) {
    const selKey = gridInstance.instance.getSelectedRowKeys();
    const currentKey = selKey[0] ? selKey[0] : 0;
    let index = gridInstance.instance.getRowIndexByKey(currentKey);
    if (event.keyCode === AppEnums.KeyCode.UpArrowKey && index > 0) {
      index = index - 1;
      if (index >= 0) {
        this.selectedKeyByIndexs(gridInstance, index, false);
        return;
      }
    } else if (event.keyCode === AppEnums.KeyCode.DownArrowKey && (index + 1) < dataSource.length) {
      index = index + 1;
      this.selectedKeyByIndexs(gridInstance, index, true);
      return;
    }
    return;
  }

  selectedKeyByIndexs(gridInstance, index, keyCode) {
    const indexKey = keyCode ? index + 1 : index;
    if (this.isgridErlernterBeruf) {
      gridInstance.instance.selectRowsByIndexes([index]);
      this.scrollGridByindex(gridInstance.instance, indexKey);

    }
    if (this.isgridBeruf) {
      gridInstance.instance.selectRowsByIndexes([index]);
      this.scrollGridByindex(gridInstance.instance, indexKey);
    }
    if (this.isgridArbeitgeber) {
      gridInstance.instance.selectRowsByIndexes([index]);
      this.scrollGridByindex(gridInstance.instance, indexKey);
    }
  }

  scrollGridByindex(gridInstance, index) {
    const row = gridInstance.getRowElement(index);
    gridInstance.getScrollable().scrollToElement(row);
  }

  onSelectionChangedGrid($event, field) {
    if (!$event.selectedRowsData[0]) {
      return;
    }
    switch (field) {
      case ArbeitConstant.ErlernterBeruf:
        this.arbeitModel.erlernterBerufCode = $event.selectedRowsData[0].baBerufID;
        this.arbeitModel.erlernterBeruf = $event.selectedRowsData[0].text;
        break;
      case ArbeitConstant.Beruf:
        this.arbeitModel.berufCode = $event.selectedRowsData[0].baBerufID;
        this.arbeitModel.beruf = $event.selectedRowsData[0].text;
        break;
      case ArbeitConstant.Arbeitgeber:
        this.arbeitModel.baInstitutionID = $event.selectedRowsData[0].baInstitutionID;
        this.arbeitModel.arbeitgeber = $event.selectedRowsData[0].name;
        break;
      default:
        break;
    }
  }

  onSelectedChangeSroll(gridInstance) {
    const selKey = gridInstance.getSelectedRowKeys();
    const currentKey = selKey[0] ? selKey[0] : 0;
    const index = gridInstance.getRowIndexByKey(currentKey);
    const row = gridInstance.getRowElement(index + 1);
    gridInstance.getScrollable().scrollToElement(row);
  }

  statusForm() {
    return this.isArbeitModelChanged();
  }

  getSizeQualifier(width) {
      if (width < ArbeitConstant.screenLargeWidth) {
        return 'xs';
      }
      return 'lg';
  }

  blurAll() {
    const el = document.querySelector( ':focus' );
      if (el) {
        (el as HTMLElement).blur();
      }
  }

  onDropdownOpened(type) {
    if (!this.gridErlernterBeruf && !this.gridBeruf && !this.gridArbeitgeber) {
      return;
    }
    setTimeout(() => {
      switch (type) {
        case ArbeitConstant.ErlernterBeruf:
          if (!this.arbeitModel.erlernterBerufCode) {
            this.gridErlernterBeruf.instance.focus(this.gridErlernterBeruf.instance.getCellElement(0, 0)); break;
          }
          for (let i = 0; i < this.berufSuchens.length; i++) {
            if (this.berufSuchens[i].baBerufID === this.arbeitModel.erlernterBerufCode) {
              this.gridErlernterBeruf.instance.focus(this.gridErlernterBeruf.instance.getCellElement(this.berufSuchens.length - (this.berufSuchens.length - i), 0));
              return;
            }
          }
          break;
        case ArbeitConstant.Beruf:
          if (!this.arbeitModel.berufCode) {
            this.gridBeruf.instance.focus(this.gridBeruf.instance.getCellElement(0, 0)); break;
          }
          for (let i = 0; i < this.berufSuchens.length; i++) {
            if (this.berufSuchens[i].baBerufID === this.arbeitModel.berufCode) {
              this.gridBeruf.instance.focus(this.gridBeruf.instance.getCellElement(this.berufSuchens.length - (this.berufSuchens.length - i), 0));
              return;
            }
          }
          break;
        case ArbeitConstant.Arbeitgeber:
          if (!this.arbeitModel.baInstitutionID) {
            this.gridArbeitgeber.instance.focus(this.gridArbeitgeber.instance.getCellElement(0, 0)); break;
          }
          for (let i = 0; i < this.institutionSuchens.length; i++) {
            if (this.institutionSuchens[i].baInstitutionID === this.arbeitModel.baInstitutionID) {
              this.gridArbeitgeber.instance.focus(this.gridArbeitgeber.instance.getCellElement(this.institutionSuchens.length - (this.institutionSuchens.length - i), 0));
              return;
            }
          }
          break;
        default:
          break;
      }
    }, CommonConstant.SetTimeOut);
  }

  validateDataValid() {
    if (!this.stempelDatum.isValid || !this.ausgesteuertDatum.isValid ||
      (this.validationGroup.instance.validate() && !this.validationGroup.instance.validate().isValid)) {
      return false;
    } else {
      return true;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.keyCode === AppEnums.KeyCode.UpArrowKey || event.key === 'ArrowUp') && !this.focusTextarea) {
      this.moveFocus(false);
    }
    if ((event.keyCode === AppEnums.KeyCode.DownArrowKey || event.key === 'ArrowDown') && !this.focusTextarea) {
      this.moveFocus(true);
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    // to fix form rerender item when resize
  }
}
