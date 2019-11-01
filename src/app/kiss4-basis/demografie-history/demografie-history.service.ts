import { Injectable } from '@angular/core';
import { xUserHistory, Personalien, Wohnsitz, Aufenthaltsort } from './models';

@Injectable()
export class DemografieService {
    static gridXUserHistoryAdapter(xuserHistory: any): xUserHistory[] {
        return xuserHistory.map(i => new xUserHistory(i));
    }
    static gridPersonalienAdapter(personalien: any): Personalien {
        return new Personalien(personalien);
    }
    static gridWohnsitzAdapter(wohnsitz: any): Wohnsitz {
        return new Wohnsitz(wohnsitz);
    }
    static gridAufenthaltsortAdapter(aufenthaltsort: any): Aufenthaltsort {
        return new Aufenthaltsort(aufenthaltsort);
    }
}
