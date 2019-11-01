import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxButtonComponent, DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'kiss-uber-speicher',
  templateUrl: './uber-speicher.component.html',
  styleUrls: ['./uber-speicher.component.scss']
})
export class UberSpeicherComponent implements OnInit {
  isExpandTabSpeicher = true;
  isSpeicherVisible = true;
  selectedGridSpeicherKeys = [];
  emitMouseEvent = new Subject<boolean>();
  @Input() browserVersions: any;
  @Output() buttonSpeicher: EventEmitter<any> = new EventEmitter();
  @Output() buttonRefreshSpeicher: EventEmitter<any> = new EventEmitter();
  @Output() mouseEnterUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeaveUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseDown: EventEmitter<any> = new EventEmitter();
  @ViewChild('gridSpeicher') gridSpeicher: DxDataGridComponent;
  @ViewChild('btnSpeicher') btnSpeicher: DxButtonComponent;
  customizeBtn = [
    {
      text: this.translateService.instant('Uber.Buttons.Copy'),
      visible: true,
      name: 'uber-detail-copy',
      type: 'default'
    },
    {
      text: this.translateService.instant('Uber.Buttons.Refresh'),
      visible: true,
      name: 'uber-detail-refresh',
      type: 'default'
    }
  ];

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  actionSpeicherKopiFrm5OnClick() {
    this.buttonSpeicher.emit();
  }

  actionSpeicherAnsichtFrm5OnClick() {
    this.buttonRefreshSpeicher.emit(this.gridSpeicher);
  }

  onClickGrid() {
    this.mouseDown.emit('gridSpeicher');
  }

  public removeSelectedGridSpeicherKeys() {
    this.selectedGridSpeicherKeys = [-1];
  }
  toolBarOnItemClick(e) {
    switch (e) {
      case 'uber-detail-copy':
        this.buttonSpeicher.emit();
        break;
      case 'uber-detail-refresh':
        this.gridSpeicher.instance.clearFilter();
        this.buttonRefreshSpeicher.emit(this.gridSpeicher);
        break;
      default:
        break;
    }
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Uber.Title_Group.Storage')) {
      this.isExpandTabSpeicher = !this.isExpandTabSpeicher;
    }
  }
}
