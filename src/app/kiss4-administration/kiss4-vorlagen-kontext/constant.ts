export class VorlagenKontextConstant {
  public static folder = 0;
  public static word = 1;
  public static excel = 2;
  public static kontextName = 2;
  public static beschreibung = 4;
  public static verfuegbarGrid = 6;
  public static buttonRight = 15;
  public static buttonLeft = 16;
  public static buttonAllLeft = 17;
  public static zugeteilTree = 18;
  public static buttonUp = 20;
  public static buttonDown = 21;
  public static ordnername = 13;
  public static buttonAddToTree = 14;
  public static einfugen = 19;
  public static verfuegbareGrid = 'verfuegbareGrid';
  public static zuweisungenAbteilungenTree = 'zuweisungenAbteilungenTree';
  public static neuerKontext = 'neuerKontext';
  public static neuerKontextTitle = 'VorlagenKontext.Button.Add';
  public static neuerKontextIcon = 'add';
  public static typeBoxInput = 'input';
  public static typeBoxChange = 'change';
  public static bearbeiten = 'bearbeiten';
  public static bearbeitenTitle = 'VorlagenKontext.Button.Edit';
  public static bearbeitenIcon = 'edit';
  public static speichern = 'speichern';
  public static speichernTitle = 'VorlagenKontext.Button.Save';
  public static speichernIcon = 'save';
  public static abbrechen = 'abbrechen';
  public static abbrechenTitle = 'VorlagenKontext.Button.Cancel';
  public static abbrechenIcon = 'close';
  public static btnYes = 'VorlagenKontext.NavigatorPopupConfirm.Yes';
  public static btnNo = 'VorlagenKontext.NavigatorPopupConfirm.No';
  public static popupTitle = 'VorlagenKontext.NavigatorPopupConfirm.Title';
  public static popupMessage = 'VorlagenKontext.NavigatorPopupConfirm.Message';
  public static eventNavPrint = 'printPdf';
  public static eventNavColChooser = 'chooserColumn';
  public static eventNavExportExcel = 'exportExcel';
  public static eventNavGridPrint = 'gridprint';
  public static eventNavGridSetting = 'gridSetting';
  public static ctmBtnType = 'default';
  public static gridFunctionKeyKontext = 'gridSettingVorlagenKontext';
  public static defaultTextErr = '';
  public static formValidate = 'VorlagenKontext.MessageValidate.FormValidate';
  public static DeleteAppNew = 'VorlagenKontext.Message.DeleteAppNew';
  public static CancelEditModel = 'VorlagenKontext.Message.CancelEditModel';
  public static translateKeyBtnConfirmDelete = 'VorlagenKontext.Message.ComfirmDelete';
  public static translateKeyBtnConfirmYes = 'VorlagenKontext.Message.UpdateComfirmYes';
  public static translateKeyBtnConfirmNo = 'VorlagenKontext.Message.UpdateComfirmNo';
  public static translateKeyBtnYes = 'VorlagenKontext.Message.ComfirmYes';
  public static translateKeyBtnNo = 'VorlagenKontext.Message.ComfirmNo';
  public static translateKeyPopupTitle = 'VorlagenKontext.Message.TitleComfirm';
  public static translateKeyInformation = 'VorlagenKontext.Message.Information';
  public static message = {
    'de-CH': `Der Kontext %s kann nicht gelöscht werden, solange noch zugeteilte Vorlagen/Ordner existieren!`,
    'fr-CH': `Le contexte %s ne peut pas être supprimé tant qu'il existe des modèles / dossiers assignés!`,
    'en-EN': `The context %s can not be deleted, as long as assigned templates / folders exist!`
  };
  public static listColumnData = [
    {
      caption: 'VorlagenKontext.KontextName',
      field: 'docContextName'
    },
    {
      caption: 'VorlagenKontext.Description',
      field: 'description'
    },
  ];
  public static listColumnDocument = [
    {
      caption: 'VorlagenKontext.VorlagenkontextDetails.File',
      field: 'docFormatCode',
      cellTemplate: 'cellIcon',
      width: `${10}%`
    },
    {
      caption: 'VorlagenKontext.VorlagenkontextDetails.VerfugbareVorlagen',
      field: 'docTemplateName'
    },
  ];
}
