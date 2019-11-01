import {Injectable} from '@angular/core';
import {HaushaltQuery, IHaushalt, IKlientenSystem, IPersonenImHaushalt, ISaveWhPersonen, IWhKennzahlen, KlientenSystemQuery, PersonenImHaushaltQuery, SaveWhPersonenQuery, WhKennzahlenQuery} from './models/index';

@Injectable()
export class PersonenImHaushaltService {
    /**
     * Transforms grid data personen-im-haushalt recieved from the API into array of 'personen-im-haushalt' instances
     *
     * @param personen-im-haushalt
     */
    static headerAdapter(personenImHaushalts: IPersonenImHaushalt[]): PersonenImHaushaltQuery {
        return new PersonenImHaushaltQuery(personenImHaushalts[0]);
    }
    static whKennzahlenAdapter(whKennzahlen: IWhKennzahlen[]): WhKennzahlenQuery {
        return new WhKennzahlenQuery(whKennzahlen[0]);
    }
    static klientensystemAdapter(klientenSystem: IKlientenSystem[]): KlientenSystemQuery {
        return new KlientenSystemQuery(klientenSystem);
    }
    static haushaltAdapter(haushalt: IHaushalt[]): HaushaltQuery {
        return new HaushaltQuery(haushalt);
    }
    static saveWhPersonenAdapter(respone: ISaveWhPersonen) {
        return new SaveWhPersonenQuery(respone);
    }
}
