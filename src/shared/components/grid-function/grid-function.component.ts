import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonConstant } from '@shared/common/constant.common';
import { GridSettingModel } from '@shared/models/shared/grid-setting.model';
import { DxPopupComponent } from 'devextreme-angular';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-grid-function',
  templateUrl: './grid-function.component.html',
  styleUrls: ['./grid-function.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridFunctionComponent {
  @ViewChild('popupGridFunction') popupGridFunction: DxPopupComponent;
  // tslint:disable-next-line:no-input-rename
  @Input('keyStorage') key: any;
  @Output() onchange: EventEmitter<any> = new EventEmitter();
  public model: GridSettingModel = new GridSettingModel();

  constructor() { }

  // ngOnInit() {
  //   let gridSetting: any = localStorage.getItem(this.key);
  //   if (gridSetting) {
  //     this.model = new GridSettingModel();
  //     gridSetting = JSON.parse(gridSetting);
  //     this.model = Object.assign(this.model, gridSetting);
  //   } else {
  //     this.resetSetting();
  //   }
  // }

  resetSetting() {
    this.model = new GridSettingModel();
    localStorage.setItem(this.key, JSON.stringify(this.model));
    this.onchange.emit();
  }

  showPopup(setting) {
    this.model = setting;
    this.popupGridFunction.instance.show();
  }

  hidePopup() {
    // send reset event and close popup
    if (this.model.resetAllSetting) {
      this.resetSetting();
    } else {
      localStorage.setItem(this.key, JSON.stringify(this.model));
      this.onchange.emit();
    }
    this.popupGridFunction.instance.hide();
  }

  updateSetting(setting: any) {
    localStorage.setItem(this.key, JSON.stringify(setting));
  }

  menuGrouping(event, expand, grid, arrayTextDisplayMenuOfHeaderGrid = [], arrayTextDisplayMenuOfContentGrid = CommonConstant.MenuGroupingContentGrid) {
    if (isNullOrUndefined(event.items)) {
      event.items = [];
    }
    switch (event.target) {
      case 'header':
        if (!event.column.dataField || event.column.dataField.length <= 0) {
          break;
        }
        if (event.items.length > 3) {
          event.items.splice(3, event.items.length - 3);
        }
        event.items.push({ disabled: false, onItemClick: () => this.groupingHeaderRightClick(event.column.caption, grid), text: arrayTextDisplayMenuOfHeaderGrid[0], beginGroup: true });
        event.items.push({ disabled: false, onItemClick: () => this.unAllGroupingHeaderRightClick(grid), text: arrayTextDisplayMenuOfHeaderGrid[1] });
        event.items.push({ disabled: false, onItemClick: () => this.hideColumn(event.column.caption, grid), text: arrayTextDisplayMenuOfHeaderGrid[2] });
        break;
      case 'content':
        break;
      default:
        break;
    }
  }

  private groupingHeaderRightClick(e, grid) {
    const indexGroup = grid.instance.getVisibleColumns().map(indexColumnGroup => indexColumnGroup.groupIndex).filter(item => item !== undefined).length;
    grid.instance.columnOption(e, 'groupIndex', indexGroup);
  }

  private unAllGroupingHeaderRightClick(grid) {
    grid.instance.clearGrouping();
  }

  private hideColumn(e, grid) {
    grid.instance.columnOption(e, 'visible', false);
  }

  private expandCloumnGrouping(expand) {
    expand.autoExpandAll = true;
  }

  private unExpandCloumnGrouping(expand) {
    expand.autoExpandAll = false;
  }
}
