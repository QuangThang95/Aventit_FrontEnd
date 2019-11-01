import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxButtonComponent, DxDataGridComponent } from 'devextreme-angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'kiss-uber-assemblies',
  templateUrl: './uber-assemblies.component.html',
  styleUrls: ['./uber-assemblies.component.scss']
})
export class UberAssembliesComponent implements OnInit {
  isExpandTabAssemblies = true;
  isAssembliesVisible: boolean;
  selectedGridKiss4WebVersionsKeys = [];
  emitMouseEvent = new Subject<boolean>();
  @Input() kiss4WebVersions: any;
  @Output() buttonClickAssemblies: EventEmitter<any> = new EventEmitter();
  @Output() buttonRefreshAssemblies: EventEmitter<any> = new EventEmitter();
  @Output() mouseEnterUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseLeaveUber: EventEmitter<any> = new EventEmitter();
  @Output() mouseDown: EventEmitter<any> = new EventEmitter();
  @ViewChild('gridKiss4WebVersions') gridKiss4WebVersions: DxDataGridComponent;
  @ViewChild('btnAssemblies') btnAssemblies: DxButtonComponent;
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

  onClickGrid() {
    this.mouseDown.emit('gridAssemblies');
  }

  public removeselectedGridKiss4WebVersionsKeys() {
    this.selectedGridKiss4WebVersionsKeys = [-1];
  }
  toolBarOnItemClick(e) {
    switch (e) {
      case 'uber-detail-copy':
      this.buttonClickAssemblies.emit(this.gridKiss4WebVersions);
        break;
      case 'uber-detail-refresh':
      this.gridKiss4WebVersions.instance.clearFilter();
      this.buttonRefreshAssemblies.emit(this.gridKiss4WebVersions);
        break;
      default:
        break;
    }
  }
  changeCollapseFormContent(event) {
    if (event.target.textContent === this.translateService.instant('Uber.Title_Group.Assemblies')) {
      this.isExpandTabAssemblies = !this.isExpandTabAssemblies;
    }
  }
}
