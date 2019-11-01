import { Injectable } from '@angular/core';
import { FallNavNavigatorTreeModel } from '@app/kiss4-main/fall-navigator/models';
import { Store } from '@ngrx/store';
import { AppEnums } from '@shared/AppEnum';
import { SelectedActionsModel } from '@shared/models';
import { Sandbox } from '@shared/sandbox/base.sandbox';
import * as store from '@shared/store';
import * as settingsActions from '@shared/store/actions/settings.actions';
import { UtilService } from '@shared/utilites/utility.service';
import { Subscription } from 'rxjs/rx';

import { PostXLangText } from './models';
import * as vorlagenProfileStore from './store';
import * as vorlagenProfilesAction from './store/actions/vorlagenProfile.actions';

@Injectable()
export class VorlagenProfileSandbox extends Sandbox {

  public vorlagenProfileData$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getVorlagenProfileData);
  public xProfileID$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getXProfileID);
  public xProfileTagID$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getXProfileTagID);
  public insertXProfileResult$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getInsertXProfileResult);
  public currentTID$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getCurrentTID);
  public saveXLangTextResult$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getSaveXLangTextResult);
  public deleteXProfileResult$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getDeleteXProfileResult);
  public deleteXProfileTagResult$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getDeleteXProfileTagResult);
  public execspXSaveProfileTagsResult$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getExecspXSaveProfileTagsResult);
  public updateXProfileResult$ = this.vorlagenProfileState$.select(vorlagenProfileStore.getUpdateXProfileResult);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private vorlagenProfileState$: Store<vorlagenProfileStore.VorlagenProfileState>,
    private utilService: UtilService
  ) {
    super(appState$);
  }

  public selectAction(treeModel: FallNavNavigatorTreeModel, url: string): void {
    const actions: SelectedActionsModel = {
      id: treeModel.id,
      name: treeModel.name,
      time: new Date(),
      data: treeModel,
      url: url,
      age: treeModel['age'] ? treeModel['age'] : 0,
      gender: treeModel['geschlechtName'] ? treeModel['geschlechtName'].split('')[0] : 'n',
      type: AppEnums.PageType.fallnavigator
    };
    this.appState$.dispatch(new settingsActions.UpdateSelectedAction(actions));
  }

  /**
   * Loads vorlagenProfiles from the server
   */
  public loadVorlagenProfileInitData(params?: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.LoadVorlagenProfilesAction(params));
  }

  /**
   * Loads load XProfile Tags from the server
   */
  public loadXProfileTagsData(params?: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.LoadXProfileTagIDAction(params));
  }

  /**
   * Loads load XProfile from the server
   */
  public loadXProfileData(params?: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.LoadXProfileIDAction(params));
  }

  /**
   * Post XProfile to the server
   */
  public insertXProfileData(params: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.InsertXProfilePostAction(params));
  }

  /**
   * Post Save XLang Text to the server
   */
  public saveXLangTextData(params: PostXLangText): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.SaveXLangTextPostAction(params));
  }

  /**
   * Get Current TID from the server
   */
  public getCurrentTIDData(params?: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.LoadCurrentTIDAction(params));
  }

  /**
   * Get Delete XPRofile from the server
   */
  public DeleteXProfile(params?: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.DeleteXProfileDeleteAction(params));
  }

  /**
   * Get Delete XPRofile Tag from the server
   */
  public DeleteXProfileTag(params?: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.DeleteXProfileTagDeleteAction(params));
  }

  /**
   * Post Execsp XSave Profile Tags to the server
   */
  public execspXSaveProfileTagsData(params: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.ExecspXSaveProfileTagsPostAction(params));
  }

  /**
   * PUT XProfile to the server
   */
  public updateXProfileData(params: any): void {
    this.vorlagenProfileState$.dispatch(new vorlagenProfilesAction.UpdateXProfilePutAction(params));
  }

  /**
   * insert XProfile function
   */
  public insertXProfile(text: string, languageCode: number, profieTags: string): void {
    const profile = {
      LanguageCode: languageCode,
      Text: text,
      XProfileTypeCode: 1,
      Name: text,
      SelectedValues: profieTags,
      Description: '',
      Creator: '',
      Created: null,
      Modifier: '',
      Modified: null,
    }; this.insertXProfileData(profile);
  }

  public notifyMessage(
    messageTranslationCode: string,
    type: string = 'info',
    titleTranslationCode?: string
  ): any {
    this.utilService.displayNotification(
      messageTranslationCode,
      type,
      titleTranslationCode
    );
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  public registerEvents(): void {
    this.subscriptions.push(this.loggedUser$.subscribe((user: any) => {
      if (user.isLoggedIn) {
        // this.LoadFallNavFilterStartup();
      } else {
        this.clearStore();
        this.unregisterEvents();
      }
    }));
  }

  /**
   * Clear store for sandbox vorlagenProfile
   */
  private clearStore() {
    vorlagenProfileStore.getVorlagenProfileData.release();
    vorlagenProfileStore.getVorlagenProfileLoading.release();
  }
}
