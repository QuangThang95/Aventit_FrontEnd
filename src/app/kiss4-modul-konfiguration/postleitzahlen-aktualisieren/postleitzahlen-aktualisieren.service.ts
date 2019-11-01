import { Injectable } from '@angular/core';

import { PostleitzahlenAktualisieren } from './models/postleitzahlen-aktualisieren.model';

@Injectable()
export class PostleitzahlenAktualisierenService {

  static gridAdapter(postleitzahlenAktualisierens: any): Array<any> {
    return postleitzahlenAktualisierens.map(
      postleitzahlenAktualisieren => new PostleitzahlenAktualisieren(postleitzahlenAktualisieren)
    );
  }

  static syncDataAdapter(response: any): any {
    return { ...response };
  }

}
