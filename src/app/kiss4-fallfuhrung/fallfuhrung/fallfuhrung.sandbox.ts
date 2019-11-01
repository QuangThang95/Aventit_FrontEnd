import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';

import { ModelQueryGetConfig, ModelQueryUpdateFaleistung, ModelQueryValidationFaLeistung } from './models';
import * as FallfuhrungStore from './store';
import * as FallfuhrungAction from './store/actions/fallfuhrung.action';

@Injectable()
export class FallfuhrungSandbox extends Sandbox {
    public FallfuhrungData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getFallfuhrungData
    );

    public ConfigData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getConfigData
    );

    public FallRightsData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getFallRightsData
    );

    // Load data combobox Kontaktveranl
    public KontaktveranlData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getKontaktveranlData
    );

    // Load data combobox Grund
    public GrundData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getGrundData
    );

    // Load data combobox Gemeinde
    public GemeindeData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getGemeindeData
    );

    //  Update FaLeistung
    public UpdateFaLeistungData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.updateFaLeistungData
    );

    // Load data combobox Anmeldeart
    public AnmeldeartData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getAnmeldeartData
    );

    // Load data AnzahlOffenePendenzen
    public AnzahlOffenePendenzenData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getAnzahlOffenePendenzenData
    );

    // Load data ValidationFaLeistung
    public ValidationFaLeistungData$ = this.fallfuhrungState$.select(
        FallfuhrungStore.getValidationFaLeistungData
    );
    constructor(
        protected appState$: Store<store.State>,
        private fallfuhrungState$: Store<FallfuhrungStore.FallfuhrungState>
    ) {
        super(appState$);
    }


    /**
  * *****************************************************************
  * dispatch action load data Fallfuhrung
  * *****************************************************************
  */
    public loadFallfuhrungData(faLeistungID?: number): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.FallfuhrungData.LoadAction(faLeistungID));
    }

    /**
  * *****************************************************************
  * dispatch action load config
  * *****************************************************************
  */
    public loadConfigData(modelQueryConfig?: ModelQueryGetConfig): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetConfigData.LoadAction(modelQueryConfig));
    }

    /**
  * *****************************************************************
  * dispatch action load Fall Rights
  * *****************************************************************
  */
    public loadFallRightsData(faLeistungID: any): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetFallRightsData.LoadAction(faLeistungID));
    }

    /**
  * *****************************************************************
  * dispatch action load Kontaktveranl
  * *****************************************************************
  */
    public loadKontaktveranlData(LOVName: string): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetKontaktveranlData.LoadAction(LOVName));
    }

    /**
  * *****************************************************************
  * dispatch action load Grund
  * *****************************************************************
  */
    public loadGrundData(LOVName: string): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetGrundData.LoadAction(LOVName));
    }

    /**
      * *****************************************************************
      * dispatch action load Gemeinde
      * *****************************************************************
      */
    public loadGemeindeData(lOVName: string): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetGemeindeData.LoadAction(lOVName));
    }

    /**
      * *****************************************************************
      * dispatch action  Update FaLeistung
      * *****************************************************************
      */
    public updateFaLeistungData(modelQueryUpdateFaleistung: ModelQueryUpdateFaleistung): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.UpdateFaLeistungData.UpdateAction(modelQueryUpdateFaleistung));
    }

    /**
      * *****************************************************************
      * dispatch action load Anmeldeart
      * *****************************************************************
      */
    public loadAnmeldeartData(lOVName: string): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetAnmeldeartData.LoadAction(lOVName));
    }

    /**
      * *****************************************************************
      * dispatch action load AnzahlOffenePendenzen
      * *****************************************************************
      */
    public loadAnzahlOffenePendenzenData(faLeistungID: number): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.GetAnzahlOffeneData.LoadAction(faLeistungID));
    }

    /**
      * *****************************************************************
      * dispatch action ValidationFaLeistung
      * *****************************************************************
      */
    public validationFaLeistungData(modelQuery: ModelQueryValidationFaLeistung): void {
        this.fallfuhrungState$.dispatch(new FallfuhrungAction.ValidationFaLeistungData.LoadAction(modelQuery));
    }
    public resetFallfuhrungState(): void {
        this.fallfuhrungState$.dispatch(
            new FallfuhrungAction.FallfuhrungData.ResetStateAction()
        );
    }
}
