import { Injectable } from '@angular/core';
import { FallNavNavigatorTreeModel } from '@app/kiss4-main/fall-navigator/models';

import { IconModule, PersonInfoTitel } from './models';
import { BNavigatorItem } from './models/b-navigator.model';
import { GetCountFaPhaseModel, GetFaLeistungByBaPersonIDModel } from './models/beratungsphase.model';
import { Faleistung } from './models/faleistung.model';
import { RightContentItem } from './models/right-content-item.model';
import { TreeViewItem } from './models/tree-view-item.model';

@Injectable({
  providedIn: 'root'
})
export class FallfuhrungTreeService {

  constructor() { }

  static getIconModule(icons: any): IconModule[] {
    return icons.map(icon => {
      return new IconModule(icon);
    });
  }

  static getVisibleZeitachse(result: any): boolean {
    const mapped = result.map(i => i)[0];
    return mapped.result;
  }

  static getPersonInfoTitel(result: any): PersonInfoTitel {
    return new PersonInfoTitel(result[0]);
  }

  static getTreeViewItems(treeViewItems: any): Array<any> {
    return treeViewItems.map(
      treeViewItem => new TreeViewItem(treeViewItem)
    );
  }

  static getRightContentItems(rightContentItems: any): Array<any> {
    return rightContentItems.map(
      rightContentItem => new RightContentItem(rightContentItem)
    );
  }

  static getUserIDFaLeistungOrFaPhase(data: any): any {
    if (data && data.length > 0) {
      return data[0];
    }
  }

  static getBNavigatorItems(BNavigatorItems: any): Array<any> {
    return BNavigatorItems.map(
      bNavigatorItem => new BNavigatorItem(bNavigatorItem)
    );
  }

  static deleteFaPhaseAdapter(data: any): any {
    return data;
  }

  static getFaleistungAdapter(Faleistungs: any): Array<any> {
    return Faleistungs.map(
      faleistung => new Faleistung(faleistung)
    );
  }

  static deleteFallverlaufAdapter(data: any): any {
    return data;
  }
  static deleteBaPersonRelation(result: any): any {
    return result;
  }

  // Map data when get FaLeistung By BaPersonID
  static getFaLeistungByBaPersonIDAdapter(data: any): any {
    return new GetFaLeistungByBaPersonIDModel(data);
  }

  // Map data when Get CountFa Phase
  static getCountFaPhaseAdapter(data: any): Array<any> {
    return data.map(
      item => new GetCountFaPhaseModel(item)
    );
  }

  // Map data when Get FaPhase By FaLeistungID
  static getFaPhaseByFaLeistungIDAdapter(data: any): any {
    return data;
  }

  // Map data when insert FaPhase
  static insertFaPhaseAdapter(FaPhase: any): any {
    return FaPhase;
  }

  // Map data when update FaLeistung data
  static updateFaLeistungDataAdapter(data: any): any {
    return data;
  }

  // Get Config Int
  static getConfigIntAdapter(configIntData: any): any {
    return configIntData;
  }

  // Get Config Bool
  static getConfigBoolAdapter(configBoolData: any): any {
    return configBoolData;
  }

  // Get Message Information
  static getMessageInformationAdapter(data: any): any {
    return data;
  }

  static getCountBgFinanzPlan(result: any): any {
    return result;
  }

  static getBaPersonIDModulID(data: any): any {
    if (data && data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  }

  static getTreeFallNavigator(data: any): any {
    if (data) {
      if (data[0].type === 'E') {
        data[0].parentId = '0';
      }
  }
  return data.map(tree => new FallNavNavigatorTreeModel(tree));
  }
}
