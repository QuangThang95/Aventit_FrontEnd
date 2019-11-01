import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { AppEnums } from '@shared/AppEnum';
import { GrundBedarfConstant } from '@shared/common/sozialhilfe.common';
import { DxNumberBoxComponent, DxValidationGroupComponent, DxValidatorComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { DPLSelectboxModel, GrundBedarfFormDataModel } from '../../models';

@Component({
  selector: 'kiss-grundbedarf-detail-edit',
  templateUrl: './grundbedarf-detail-edit.component.html',
  styleUrls: ['./grundbedarf-detail-edit.component.scss']
})
export class GrundBedarfDetailEditComponent implements AfterViewInit, OnDestroy {
  @Input()
  typeFormatNumber: string;
  // Datasource
  @Input()
  grundBedarfFormData: GrundBedarfFormDataModel;
  @Input()
  dataSourceSelectboxes: DPLSelectboxModel[] = [];
  @Input()
  readOnlySettingComponents: any;
  @Input()
  visibleGroup: any;
  @Output() focusOut = new EventEmitter();
  @Output() changeDataSelectbox = new EventEmitter();
  @Output() isDirtyDataFormEvent = new EventEmitter();
  @ViewChild('validationGroupgrundbedarf') validationGroupgrundbedarf: DxValidationGroupComponent;
  @ViewChild('edtAnpassungfurUE_SKOS2005') edtAnpassungfurUE_SKOS2005: DxNumberBoxComponent;
  @ViewChild('validatorGrunbedarfAnpassfurUESKOS2005') validatorGrunbedarfAnpassfurUESKOS2005: DxValidatorComponent;
  @ViewChild('edtMonatlicherfurUE_berechnungsgrundlage') edtMonatlicherfurUE_berechnungsgrundlage: DxNumberBoxComponent;
  @ViewChild('validatorMonatlicherfurUEBerechnungsgrundlage') validatorMonatlicherfurUEBerechnungsgrundlage: DxValidatorComponent;
  @ViewChild('edtAnpassungfurUE_berechnungsgrundlage') edtAnpassungfurUE_berechnungsgrundlage: DxNumberBoxComponent;
  @ViewChild('validatorAnpassungfurUEBerechnungsgrundlage') validatorAnpassungfurUEBerechnungsgrundlage: DxValidatorComponent;
  @ViewChild('edtAnpassungIfurUE_SKOSbzw') edtAnpassungIfurUE_SKOSbzw: DxNumberBoxComponent;
  @ViewChild('validatorAnpassungIfurUE_SKOSbzw') validatorAnpassungIfurUE_SKOSbzw: DxValidatorComponent;
  @ViewChild('edtAnpassungIIfurUE_SKOSbzw') edtAnpassungIIfurUE_SKOSbzw: DxNumberBoxComponent;
  @ViewChild('validatorAnpassungIIfurUE_SKOSbzw') validatorAnpassungIIfurUE_SKOSbzw: DxValidatorComponent;

  readonly MAX_500 = 500;
  subscription = new Subscription();
  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onFocusIn(element, field: string, key) {
    this.typeFormatNumber = 'fixedPoint';
  }
  onFocusOut(e, key: string) {
    if (key === GrundBedarfConstant.MONATLICHER_FURUE_BERACHNUNGSGRUNDLAGE_NUMBER_BOX
      && this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage > this.MAX_500) {
      this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage = this.MAX_500;
    }
    if (key === GrundBedarfConstant.ANPASSUNGI_FURUE_SKOS2005_NUMBER_BOX) {
      this.grundBedarfFormData.total_furUE_SKOS2005 = this.grundBedarfFormData.grundbedarf_furUE_SKOS2005 ? this.grundBedarfFormData.grundbedarf_furUE_SKOS2005 : 0
        + this.grundBedarfFormData.anpassung_furUE_SKOS2005 ? this.grundBedarfFormData.anpassung_furUE_SKOS2005 : 0
          + this.grundBedarfFormData.abzugVVG_furUE_SKOS2005 ? this.grundBedarfFormData.abzugVVG_furUE_SKOS2005 : 0;
    }
    if (GrundBedarfConstant.ANPASSUNG_FURUE_BERACHNUNGSGRUNDLAGE_NUMBER_BOX || GrundBedarfConstant.MONATLICHER_FURUE_BERACHNUNGSGRUNDLAGE_NUMBER_BOX) {
      this.grundBedarfFormData.total_furUE_Berechnungsgrundlage = (this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage ? this.grundBedarfFormData.monatlicher_furUE_Berechnungsgrundlage : 0)
        + (this.grundBedarfFormData.anpassung_furUE_Berechnungsgrundlage ? this.grundBedarfFormData.anpassung_furUE_Berechnungsgrundlage : 0)
        + (this.grundBedarfFormData.abzugVVG_furUE_Berechnungsgrundlage ? this.grundBedarfFormData.abzugVVG_furUE_Berechnungsgrundlage : 0);
    }
    if (GrundBedarfConstant.ANPASSUNGI_FURUE_SKOSbzw_NUMBER_BOX || GrundBedarfConstant.ANPASSUNGII_FURUE_SKOSbzw_NUMBER_BOX) {
      this.grundBedarfFormData.total_furUE = (this.grundBedarfFormData.grundbedarfI_furHG ? this.grundBedarfFormData.grundbedarfI_furHG : 0)
        + (this.grundBedarfFormData.zuschlag_furHG ? this.grundBedarfFormData.zuschlag_furHG : 0)
        + (this.grundBedarfFormData.grundbedarfII_furHG ? this.grundBedarfFormData.grundbedarfII_furHG : 0)
        + (this.grundBedarfFormData.grundbedarfI_furUE ? this.grundBedarfFormData.grundbedarfI_furUE : 0)
        + (this.grundBedarfFormData.anpassungI_furUE ? this.grundBedarfFormData.anpassungI_furUE : 0)
        + (this.grundBedarfFormData.abzugVVG_furUE ? this.grundBedarfFormData.abzugVVG_furUE : 0)
        + (this.grundBedarfFormData.zuschlag_furUE ? this.grundBedarfFormData.zuschlag_furUE : 0)
        + (this.grundBedarfFormData.grundbedarfII_furUE ? this.grundBedarfFormData.grundbedarfII_furUE : 0)
        + (this.grundBedarfFormData.anpassungII_furUE ? this.grundBedarfFormData.anpassungII_furUE : 0);
    }
    this.isDirtyDataFormEvent.emit({ result: true});
    this.typeFormatNumber = 'decimal';
  }
  onKeyDown(e) {
  }
  onClosed() {
  }
  onOpened() {
  }
  onChangeData(event, key: string) {
    if (key === 'berechnungsgrundlage') {
      switch (event.value) {
        case 1:
          this.changeToSKOS2005Group();
          break;
        case 2:
          this.changeToSKOSbzwGroup();
          break;
        case 3:
          this.changeToBerechnungsgrundlageGroup();
          break;
        default:
          break;
      }
      this.changeDataSelectbox.emit({ value: event.value, key: 'berechnungsgrundlage' });
    }
  }
  changeToSKOS2005Group() {
    this.visibleGroup.visibleSKOS2005Group = true;
    this.visibleGroup.visibleSKOSbzwGroup = false;
    this.visibleGroup.visibleBerechnungsgrundlageGroup = false;
  }
  changeToSKOSbzwGroup() {
    this.visibleGroup.visibleSKOS2005Group = false;
    this.visibleGroup.visibleSKOSbzwGroup = true;
    this.visibleGroup.visibleBerechnungsgrundlageGroup = false;
  }
  changeToBerechnungsgrundlageGroup() {
    this.visibleGroup.visibleSKOS2005Group = false;
    this.visibleGroup.visibleSKOSbzwGroup = false;
    this.visibleGroup.visibleBerechnungsgrundlageGroup = true;
  }
  onSearchByEnter() {
  }
  validationCallback($event) {
    return $event.value >= AppEnums.Int.MIN_VALUE && $event.value <= AppEnums.Int.MAX_VALUE;
  }
  onValueChanged($event) {
  }
}
