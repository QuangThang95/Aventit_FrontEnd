import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstant } from '@shared/common/constant.common';
import { copyElement, getConditionListBtn } from '@shared/utilites';

@Component({
  selector: 'kiss-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit, OnDestroy {

  constructor(
    private datePipe: DatePipe,
    private translateService: TranslateService
  ) { }

  @Output() action = new EventEmitter<string>();
  @Input() isShiftKeyDown = false;


  pageTitle = 'Vermogen und monatlicher Vermogensverbrauch';
  AdditionalButtons = [...CommonConstant.AdditionalButtons];
  listBtn = [CommonConstant.ToolbarButtons, getConditionListBtn([...this.AdditionalButtons], [CommonConstant.DeleteBtn, CommonConstant.GridSettingBtn])];

  customizeBtn = [
    {
      text: 'Bearbeiten',
      visible: false,
      disabled: false,
      name: 'bearbeiten'
    },
    {
      text: 'Speichern',
      visible: false,
      disabled: false,
      name: 'speichern'
    },
    {
      text: 'Abbrechen',
      visible: false,
      disabled: false,
      name: 'abbrechen'
    },
  ];
  info = '';
  id = '';

  ngOnInit() {}

  ngOnDestroy() {}

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
      copyElement(this.pageTitle);
    }
  }
}
