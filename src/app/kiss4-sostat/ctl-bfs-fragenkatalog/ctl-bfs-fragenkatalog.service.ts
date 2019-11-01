import { Injectable } from '@angular/core';

import { CtlBfsFragenkatalog } from './models';

@Injectable()
export class CtlBfsFragenkatalogService {

  static gridAdapter(CtlBfsFragenkatalogs: any): any {
    return CtlBfsFragenkatalogs;
  }

  static getCtlBfsFragenkatalogs(CtlBfsFragenkatalogs: any): any {
    return CtlBfsFragenkatalogs.map(x => new CtlBfsFragenkatalog(x));
  }

  static addCtlBfsFragenkatalogAdapter(CtlBfsFragenkatalogs: any): any {
    return CtlBfsFragenkatalogs.map(x => new CtlBfsFragenkatalog(x));
  }

  static updateCtlBfsFragenkatalogs(ctlBfsFragenkatalog: any): any {
    return new CtlBfsFragenkatalog(ctlBfsFragenkatalog);
  }

  static deleteCtlBfsFragenkatalogAdapter(response: any): any {
    return { ...response };
  }
}
