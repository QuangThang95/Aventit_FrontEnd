import { Injectable } from '@angular/core';

import {
  Top1XDocContextTemplateDown,
  Top1XDocContextTemplateUp,
  VerfuegbarByDocContextID,
  XDocContext,
  ZugeteiltByDocContextID,
} from './models';

@Injectable()
export class VorlagenKontextService {

  static getXDocContextAll(result: any): XDocContext[] {
    return result.map(i => new XDocContext(i));
  }

  static getZugeteiltByDocContextID(result: any): ZugeteiltByDocContextID[] {
    return result.map(i => new ZugeteiltByDocContextID(i));
  }

  static getVerfuegbarByDocContextID(result: any): VerfuegbarByDocContextID[] {
    return result.map(i => new VerfuegbarByDocContextID(i));
  }

  static insertXDocContext(result: any): boolean {
    return result;
  }

  static updateXDocContext(result: any): boolean {
    return result;
  }

  static deleteXDocContext(result: any): any {
    return result;
  }

  static countXDocContext_TemplateByDocContextID(result: any): number {
    return result;
  }

  static insertXDocContext_Template(result: any): any[] {
    return result;
  }

  static updateXDocContext_Template(result: any): boolean {
    return result.value;
  }
}
