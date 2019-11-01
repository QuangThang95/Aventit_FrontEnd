import { Injectable } from '@angular/core';
import {
  BgSilAHVBeitrag,
  PersonenUnterstuetzt,
  SqlQueryShPositionTyp,
  AHVBeitragPosition,
  InstitutionSuchenWh,
  LookUps,
  DropDownAnpassung
} from './models';
import { ResSuccess } from '@shared/models/shared/res-success.model';

@Injectable()
export class AhvBeitrageService {
  static bgSilAHVBeitragAdapter(data: any): any {
    const dataBgSilAHVBeitrag = data.map(
      item => new BgSilAHVBeitrag(item)
    )[0];
    return dataBgSilAHVBeitrag;
  }
  static personenUnterstuetztAdapter(data: any): Array<any> {
    const dataPersonenUnterstuetzt = data.map(
      item => new PersonenUnterstuetzt(item)
    );
    return dataPersonenUnterstuetzt;
  }
  static sqlQueryShPositionTypAdapter(data: any): Array<any> {
    const dataSqlQueryShPositionTyp = data.map(
      item => new SqlQueryShPositionTyp(item)
    );
    return dataSqlQueryShPositionTyp;
  }
  static ahvBeitragPositionAdapter(data: any): Array<any> {
    const dataAHVBeitragPosition = data.map(
      item => new AHVBeitragPosition(item)
    );
    return dataAHVBeitragPosition;
  }
  static institutionSuchenWhAdapter(data: any): Array<any> {
    const dataInstitutionSuchenWh = data.map(
      item => new InstitutionSuchenWh(item)
    );
    return dataInstitutionSuchenWh;
  }
  static deleteAHVBeitragPositionAdapter(data: any): any {
    const deleteAHVBeitragPosition = new AHVBeitragPosition(data);
    return deleteAHVBeitragPosition;
  }
  static updateAHVBeitragPositionAdapter(data: any): any {
    const updateAHVBeitragPosition = new AHVBeitragPosition(data);
    return updateAHVBeitragPosition;
  }
  static createAHVBeitragPositionAdapter(data: any): any {
    const createAHVBeitragPosition = new AHVBeitragPosition(data);
    return createAHVBeitragPosition;
  }
  static getLookupsAdapter(data: any): Array<any> {
    const getLookups = data.map(
      item => new LookUps(item)
    );
    return getLookups;
  }
  static getDropDownAnpassungAdapter(data: any): any {
    const getDropDownAnpassungs = data.map(
      item => new DropDownAnpassung(item)
    );
    return getDropDownAnpassungs;
  }
}
