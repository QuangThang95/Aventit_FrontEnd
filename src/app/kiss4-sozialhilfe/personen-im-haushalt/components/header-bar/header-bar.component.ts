import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites/index';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kiss-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) {
  }

  @Output() action = new EventEmitter<string>();
  @Input() isShiftKeyDown = false;

  @Input() set isEditMode(value: boolean) {
    this._isEditMode = value;
    this.setEditMode(this._isEditMode);
  }

  @Input() set hideBtnEdit(value: boolean) {
    if (value) {
      this.customizeBtn[0].disabled = true;
      this.customizeBtn[1].disabled = false;
      this.customizeBtn[2].disabled = false;
    } else {
      this.customizeBtn[0].disabled = false;
    }
    this.customizeBtn = [...this.customizeBtn];
  }

  @Input() set personenData(data: any) {
    if (data && data.baPersonID) {
      this.id = data.baPersonID.toString();
      this.personInfo = `${data.nameVorname}, (${this.datePipe.transform(data.geburtsdatum, 'dd.MM.yyyy')}) ` +
        `- [Id: ${data.baPersonID}]`;
      this.headerTitle = this.personInfo + ` > ${this.pageTitle}, ` +
        this.translateService.instant('PersonenImHaushalt.HeaderBar.FinanzplanVon') +
        ` ${this.datePipe.transform(data.finanzplanVon, 'dd.MM.yyyy')} ` +
        this.translateService.instant('PersonenImHaushalt.HeaderBar.FinanzplanBis') +
        ` ${this.datePipe.transform(data.finanzplanBis, 'dd.MM.yyyy')}`;
    }
  }

  pageTitle = 'Personen Im Haushalt';
  listBtn = [
    CommonConstant.ToolbarButtons,
    getConditionListBtn([...CommonConstant.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])
  ];
  customizeBtn = [
    {
      text: 'EditBtn',
      visible: true,
      disabled: false,
      name: 'bearbeiten',
      icon: 'edit'
    },
    {
      text: 'SaveBtn',
      visible: false,
      disabled: false,
      name: 'speichern',
      icon: 'save'
    },
    {
      text: 'SelectedActions.Cancel',
      visible: false,
      disabled: false,
      name: 'abbrechen',
      icon: 'close'
    },
  ];
  headerTitle = '';
  private id = '';
  private personInfo = '';
  private _isEditMode = false;

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  /**
   * Create function to process all events when user click on menu item in Top Grid
   * @param event
   */
  toolBarOnItemClickTopGrd(event: string) {
    this.action.next(event);
  }

  setEditMode(status: boolean) {
    this.customizeBtn[0].visible = !status;
    this.customizeBtn[1].visible = status;
    this.customizeBtn[2].visible = status;
    this.listBtn[0][0]['visible'] = !status;
    this.listBtn[0][1]['visible'] = !status;
    this.listBtn[0][2]['visible'] = !status;
    this.listBtn[1][0]['visible'] = !status;
    this.listBtn[1][1]['visible'] = !status;
    this.listBtn[1][2]['visible'] = !status;
    this.listBtn[1][3]['visible'] = !status;
    this.listBtn[1][4]['visible'] = !status;
    this.listBtn[1][5]['visible'] = !status;
    this.listBtn[1][6]['visible'] = !status;
    this.customizeBtn = [...this.customizeBtn];
    this.listBtn = [...this.listBtn];
  }

  onCopyTitle() {
    if (this.isShiftKeyDown) {
      copyElement(this.id);
    } else {
      copyElement(this.personInfo);
    }
  }
}
