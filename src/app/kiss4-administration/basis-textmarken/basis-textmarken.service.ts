import { Injectable } from '@angular/core';

import { Basistextmarken } from './models';

@Injectable()
export class TextmarkenService {
  static gridAdapterMarken(data: any): Array<any> {
    return data;
  }
  static saveBasistextmarken(result: any): Basistextmarken {
    return result;
  }
  static deleteBasistextmarken(result: any): Basistextmarken {
    return new Basistextmarken(result.msgRespone);
  }
}
