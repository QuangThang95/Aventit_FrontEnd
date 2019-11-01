import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { ModelGetFaLeistung } from '../fallfuhrung/models';
import {
    BeratungsphaseFormData,
    CheckDatumVon,
    CheckMinimalAllTargetsModel,
    DatumVonAndFaLeistungID,
    DeletePhaseItem,
    DPLSelectboxModel,
    GetConfigBoolItemModel,
    GetConfigIntItemModel,
    GetCountFaPhaseModel,
    GetFaLeistungByBaPersonIDModel,
    GetFallRightsModel,
    GetIntakeAndBeratungCountItemModel,
    GetMandatoryField,
    GetNewDateByFaLeistungIDModel,
    GrundSelectboxModel,
    InsertFaPhaseModel,
    Result,
    SARSelectboxModel,
    UpdateFaLeistungResultModel,
} from './models';

@Injectable()
export class BeratungsphaseService {
    // Map SAR select box data
    static getSARSelcectboxDataAdapter(SARSelectbox: any): Array<any> {
        return SARSelectbox.map(
            itemSAR => new SARSelectboxModel(itemSAR)
        );
    }
    // Map DPL zugewiesen & DPL bedarf select box data
    static getDPLSelcectboxDataAdapter(DPLSelectbox: any): Array<any> {
        return DPLSelectbox.map(
            itemDPL => new DPLSelectboxModel(itemDPL)
        );
    }
    // Map Grund select box data
    static getGrundSelcectboxDataAdapter(SARSelectbox: any): Array<any> {
        return SARSelectbox.map(
            itemSAR => new GrundSelectboxModel(itemSAR)
        );
    }
    // Map data when load Form data
    static loadFormDataAdapter(formDataBeratungsphases: any): any {
        return new BeratungsphaseFormData(formDataBeratungsphases);
    }
    // Map data when update form data
    static updateFormDataAdapter(data: any): Result {
        if (!isNullOrUndefined(data)) {
            return new Result(data);
        }
        return new Result();
    }
    // Map data when get DatumVon And FaLeistungID by FaPhaseId
    static getFaLeistungIDAndDatumVonAdapter(data: any): Array<any> {
        return data.map(
            item => new DatumVonAndFaLeistungID(item)
        );
    }
    // Map data when CheckDatumVon
    static getDuplicateCountDatumVonAdapter(data: any): Array<any> {
        return data.map(
            item => new CheckDatumVon(item)
        );
    }
    // Map data when get mandatory field
    static getGetMandatoryFieldAdapter(data: any): Array<any> {
        return data.map(
            item => new GetMandatoryField(item)
        );
    }
    // Map data when get Check minimal all targets
    static getCheckMinimalAllTargetsAdapter(data: any): Array<any> {
        return data.map(
            item => new CheckMinimalAllTargetsModel(item)
        );
    }
    // Map data when get FaLeistung By BaPersonID
    static getFaLeistungByBaPersonIDAdapter(data: any): GetFaLeistungByBaPersonIDModel {
        if (!isNullOrUndefined(data)) {
            return new GetFaLeistungByBaPersonIDModel(data);
        }
        return new GetFaLeistungByBaPersonIDModel();
    }
    // Map data when Get CountFa Phase
    static getCountFaPhaseAdapter(data: any): Array<any> {
        return data.map(
            item => new GetCountFaPhaseModel(item)
        );
    }
    // Map data when Get NewDate By FaLeistungID
    static getNewDateByFaLeistungIDAdapter(data: any): GetNewDateByFaLeistungIDModel {
        if (!isNullOrUndefined(data)) {
            return new GetNewDateByFaLeistungIDModel(data);
        }
        return new GetNewDateByFaLeistungIDModel();
    }
    // Map data when insert FaPhase
    static insertFaPhaseAdapter(FaPhase: any): InsertFaPhaseModel {
        if (!isNullOrUndefined(FaPhase)) {
            return new InsertFaPhaseModel(FaPhase);
        }
        return new InsertFaPhaseModel();
    }
    // Map data when update FaLeistung data
    static updateFaLeistungDataAdapter(data: any): UpdateFaLeistungResultModel {
        if (!isNullOrUndefined(data)) {
            return new UpdateFaLeistungResultModel(data);
        }
        return new UpdateFaLeistungResultModel();
    }
    // Map data when Get config int data
    static getConfigIntAdapter(data: any): Array<any> {
        return data.map(
            item => new GetConfigIntItemModel(item)
        );
    }
    // Map data when Get config bool data
    static getConfigBoolAdapter(data: any): GetConfigBoolItemModel {
        if (!isNullOrUndefined(data)) {
            return new GetConfigBoolItemModel(data);
        }
        return new GetConfigBoolItemModel();
    }
    // Map data when Get delete FaPhase data
    static getDeleteFaPhaseAdapter(data: any): DeletePhaseItem {
        if (!isNullOrUndefined(data)) {
            return new DeletePhaseItem(data);
        }
        return new DeletePhaseItem();
    }
    // Map data when Get Intake and Beratungsphase count By FaLeistungID
    static getIntakeAndBeratungsphaseByFaLeistungIDAdapter(data: any): Array<any> {
        return data.map(
            item => new GetIntakeAndBeratungCountItemModel(item)
        );
    }
    // Map data when Get Licensed Module
    static getLicensedModuleAdapter(data: any): Array<any> {
        return data;
    }
    // Get Fall Rights
    static getFallRightsAdapter(fallRightsData: any): GetFallRightsModel {
        if (!isNullOrUndefined(fallRightsData)) {
            return new GetFallRightsModel(fallRightsData);
        }
        return new GetFallRightsModel();
    }
    static getReopenPhaseAdapter(data: any): any {
        return data;
    }
    static getDataFallfuhrung(Fallfuhrung: any): Array<any> {
        return Fallfuhrung.map(
            fallfuhrung => new ModelGetFaLeistung(fallfuhrung)
        );
    }
}
