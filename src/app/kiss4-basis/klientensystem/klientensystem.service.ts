import { Injectable } from '@angular/core';

import { Mietvertrag, Relation, VwInstitution } from './models';

@Injectable()
export class KlientensystemService {

  /**
   * Transforms grid data falltraeger recieved from the API into array of 'falltraegers' instances
   * @param falltraegers
   */
  static getFalltraeger(falltraegers: any): any {
    return falltraegers;
  }

  /**
   * Transforms grid data relation recieved from the API into array of 'relations' instances
   * @param relations
   */
  static getRelation(relations: any): Array<any> {
    return relations.map(
      relation => new Relation(relation)
    );
  }

  /**
   * Transforms grid data vwInstitution recieved from the API into array of 'vwInstitutions' instances
   * @param vwInstitutions
   */
  static getVwInstitution(vwInstitutions: any): Array<any> {
    return vwInstitutions.map(
      vwInstitution => new VwInstitution(vwInstitution)
    );
  }

  /**
   * Transforms grid data mietvertrag recieved from the API into array of 'mietvertrags' instances
   * @param mietvertrags
   */
  static getMietvertrag(mietvertrags: any): Array<any> {
    return mietvertrags.map(
      mietvertrag => new Mietvertrag(mietvertrag)
    );
  }

  /**
   * Transforms data beziehungRelationGeneric recieved from the API into object of 'BeziehungRelationGeneric' instances
   * @param beziehungRelationGeneric
   */
  static getBeziehungRelationGeneric(beziehungRelationGeneric: any): any {
    return beziehungRelationGeneric;
  }

  /**
   * Transforms data BeziehungRelationMale recieved from the API into object of 'BeziehungRelationMale' instances
   * @param beziehungRelationMale
   */
  static getBeziehungRelationMale(beziehungRelationMale: any): any {
    return beziehungRelationMale;
  }

  /**
   * Transforms data BeziehungRelationFemale recieved from the API into object of 'BeziehungRelationFemale' instances
   * @param beziehungRelationFemale
   */
  static getBeziehungRelationFemale(beziehungRelationFemale: any): any {
    return beziehungRelationFemale;
  }

  /**
   * Transforms data inFP recieved from the API to number
   * @param inFP
   */
  static getInFP(inFP: any): number {
    return inFP;
  }

  /**
   * Transforms data GleicheAdresse recieved from the API to boolean
   * @param gleicheAdresse
   */
  static getGleicheAdresse(gleicheAdresse: any): boolean {
    return gleicheAdresse;
  }

  /**
   * Transforms data HandleGleicherHaushalt recieved from the API to boolean
   * @param handleGleicherHaushalt
   */
  static getHandleGleicherHaushaltFlagSet(handleGleicherHaushalt: any): boolean {
    return handleGleicherHaushalt;
  }

  /**
   * Update BaPersonRelation and return boolean result update
   * @param baPersonRelation
   */
  static updateBaPersonRelation(baPersonRelation: any): boolean {
    return baPersonRelation;
  }

  /**
   * Update BaMietvertrag and return boolean result update
   * @param baMietvertrag
   */
  static updateBaMietvertrag(baMietvertrag: any): any {
    return baMietvertrag;
  }

  /**
   * Update BaPerson and return boolean result
   * @param baPerson
   */
  static updateBaPerson(baPerson: any): boolean {
    return baPerson;
  }
  /**
   * Create HistoryVersion and return boolean result
   * @param historyVersion
   */
  static insertHistoryVersion(historyVersion: any): boolean {
    return historyVersion;
  }



}
