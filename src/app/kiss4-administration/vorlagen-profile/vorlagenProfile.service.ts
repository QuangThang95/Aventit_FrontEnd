import { Injectable } from '@angular/core';

import { VorlagenProfile } from './models';

@Injectable()
export class VorlagenProfileService {
    /**
     * Transforms grid data VorlagenProfile recieved from the API into array of 'vorlagenProfile' instances
     *
     * @param VorlagenProfile
     */
    static gridAdapter(vorlagenProfiles: any): Array<any> {
        return vorlagenProfiles.map(
            vorlagenProfile => new VorlagenProfile(vorlagenProfile)
        );
    }

    static getXProfileTagIDAdapter(xProfileTagID: any): Array<any> {
        return xProfileTagID;
    }

    static getXProfileIDAdapter(xProfileID: any): Array<any> {
        return xProfileID;
    }

    static deleteXProfileAdapter(deleteXProfile: any): Array<any> {
        return deleteXProfile;
    }

    static deleteXProfile_XProfileTagAdapter(deleteXProfileXProfileTag: any): boolean {
        return deleteXProfileXProfileTag;
    }

    static insertXProfileAdapter(insertXProfile: any): boolean {
        return insertXProfile;
    }

    static updateXProfileAdapter(updateXProfile: any): boolean {
        return updateXProfile;
    }

    static getCurrentTIDAdapter(getCurrentTID: any): number {
        return getCurrentTID;
    }

    static saveXLangTextAdapter(saveXLangText: any): boolean {
        return saveXLangText;
    }

    static execspXSaveProfileTagsAdapter(ExecspXSaveProfileTagsR: any): boolean {
        return ExecspXSaveProfileTagsR;
    }
}
