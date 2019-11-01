export class FallfuhrungTreeConstant {
  public static titlePage = 'Falllbearbeitung';
  public static mainUrl = 'app/fallbearbeitung/';
  public static codeB = 'B';
  public static codeF = 'F';
  public static codeS = 'S';
  public static codeI = 'I';
  public static codeM = 'M';
  public static codeK = 'K';
  public static codeA = 'A';

  // Parameter of treeview datasource API
  // Basis
  public static ModulIdB = 1;
  // Fallführung
  public static ModulIdF = 2;
  // Sozialhilfe
  public static ModulIdS = 3;
  // Inkasso
  public static ModulIdI = 4;
  // Vormundschaft
  public static ModulIdV = 5;
  // Asyl
  public static ModulIdA = 6;
  // Arbeit
  public static ModulIdK = 7;
  // Fallsteuerung
  public static ModulIdFs = 26;
  // Kindes- und Erwachsenenschutz
  public static ModulIdKes = 29;

  // Parameter of right content API
  // For F
  public static LOVNameF = 'DynaPhase';

  // prefix endPoint
  public static bUrl = 'B/Basis/';
  public static fUrl = 'F/Fallfuhrung/';
  public static sUrl = 'S/Sozialhilfe/';
  public static iUrl = 'I/Inkasso/';
  public static mUrl = 'M/Kindes-undErwachsenenschutz/';
  public static aUrl = 'A/Asyl/';
  public static kUrl = 'K/Arbeit/';

  // className for B
  public static CtlBaHaushalt = 'CtlBaHaushalt';
  public static CtlBaInstitutionenFachpersonen = 'CtlBaInstitutionenFachpersonen';
  public static CtlArbeit = 'CtlArbeit';
  public static CtlGesundheit = 'CtlGesundheit';
  public static CtlBaPerson = 'CtlBaPerson';

  // className for F
  public static CtlFaSozialSystem = 'CtlFaSozialSystem';
  public static CtlFaBeratungsperiode = 'CtlFaBeratungsperiode';
  public static CtlPendenzenVerwaltung = 'CtlPendenzenVerwaltung';
  public static CtlDynaMask = 'CtlDynaMask'; // duplicate --> need to check more condition to make url
  public static CtlFaBeratungsphase = 'CtlFaBeratungsphase';
  public static CtlFaKategorisierungView = 'Kiss.UI.View.Fa.FaKategorisierungView.xaml';
  public static CtlFaAktennotiz = 'CtlFaAktennotiz';
  public static CtlFaWeisung = 'CtlFaWeisung';
  public static CtlFaDokumente = 'CtlFaDokumente';

  // surfix endPoint for F
  public static Sozialsystem = 'Sozialsystem';
  public static Fallfuhrung = 'Fallfuhrung';
  public static Pendenzen = 'Pendenzen';
  // -- begin CtlDynaMask
  public static Dokumentation = 'Dokumentation';
  public static Ausstattung = 'Ausstattung';
  public static Zielvereinbarung = 'Zielvereinbarung';
  public static AuswertungProzess = 'AuswertungProzess';
  public static AuswertungZiele = 'AuswertungZiele';
  public static Ressourcenerschliessung  = 'Ressourcenerschliessung';
  // -- end CtlDynaMask
  public static Beratungsphase = 'Beratungsphase';
  public static Kategorisierung = 'Kategorisierung';
  public static Besprechung = 'Besprechung';
  public static Weisung = 'Weisung';
  public static Korrespondenz = 'Korrespondenz';

  // className for S
  public static CtlWhLeistung = 'CtlWhLeistung';
  public static CtlWhKontoauszug = 'CtlWhKontoauszug';
  public static CtlWhFinanzplan = 'CtlWhFinanzplan';
  public static CtlWhSpezialkonto = 'CtlWhSpezialkonto'; // duplicate --> need to check more condition to make url
  public static CtlWhASVSErfassung = 'CtlWhASVSErfassung';
  public static CtlWhPersonen = 'CtlWhPersonen';
  public static CtlBgUebersicht = 'CtlBgUebersicht';
  public static CtlWhBudget = 'CtlWhBudget';
  public static CtlBgErwerbseinkommen = 'CtlBgErwerbseinkommen';
  public static CtlBgAlimente = 'CtlBgAlimente';
  public static CtlBgVersicherung = 'CtlBgVersicherung';
  public static CtlBgVermoegen = 'CtlBgVermoegen';
  public static CtlBgGrundbedarf = 'CtlBgGrundbedarf';
  public static CtlBgWohnkosten = 'CtlBgWohnkosten';
  public static CtlBgKrankenkasse = 'CtlBgKrankenkasse';
  public static CtlBgZulagenEFB = 'CtlBgZulagenEFB';
  public static CtlNull = 'null';
  public static CtlBgSilAHVBeitrag = 'CtlBgSilAHVBeitrag';
  public static CtlBgSilWiedereingliederung = 'CtlBgSilWiedereingliederung';
  public static CtlBgSilTherapieEntzug = 'CtlBgSilTherapieEntzug';
  public static CtlBgSilKrankheitBehinderungLeistung = 'CtlBgSilKrankheitBehinderungLeistung';
  public static CtlBgSilSituationsbedingteLeistungen = 'CtlBgSilSituationsbedingteLeistungen';

  // surfix endPoint for S
  public static Sozialhilfe  = 'Sozialhilfe';
  public static Kontoauszug = 'Kontoauszug';
  public static WhFinanzplan = 'WhFinanzplan';
  // -- begin CtlWhSpezialkonto
  public static Vorabzugskonti = 'Vorabzugskonti';
  public static Abzahlungskonti = 'Abzahlungskonti';
  public static Ausgabekonti = 'Ausgabekonti';
  public static Kurzungen = 'Kurzungen';
  // -- end CtlWhSpezialkonto
  public static ASV = 'ASV';
  public static WhPersonen = 'WhPersonen';
  public static BgUebersicht = 'BgUebersicht';
  public static WhBudget = 'WhBudget';
  public static BgErwerbseinkommen = 'BgErwerbseinkommen';
  public static BgAlimentenguthaben = 'BgAlimentenguthaben';
  public static BgVersicherung = 'BgVersicherung';
  public static BgVermoegen = 'BgVermoegen';
  public static BgGrundbedarf = 'BgGrundbedarf';
  public static BgWohnkosten = 'BgWohnkosten';
  public static BgKrankenkasse = 'BgKrankenkasse';
  public static BgZulagenEFB = 'BgZulagenEFB';
  public static Situation = 'Situation';
  public static AHVBeitrag = 'AHVBeitrag';
  public static BgSilWiedereingliederung = 'BgSilWiedereingliederung';
  public static BgSilTherapieEntzug = 'BgSilTherapieEntzug';
  public static BgSilKrankheitBehinderungLeistung = 'BgSilKrankheitBehinderungLeistung';
  public static BgSilSituationsbedingteLeistungen = 'BgSilSituationsbedingteLeistungen';

  public static NotImplementUrl = 'NotImplementUrl/404';
  public static Basis = 'Basis';
  public static Inkasso = 'Inkasso';
  public static Kindes = 'Kindes-und Erwachsenenschutz';
  public static Arbeit = 'Arbeit';
  public static Asyl = 'Asyl';
  public static Institutionen = 'Institutionen';
  public static Gesundheit = 'Gesundheit';
  public static BaPerson = 'BaPerson';
  public static iconNameUrl = 'assets/icon/';
  public static iconCharacterUrl = 'assets/icon/characters-and-numbers/png/';
  public static space = ' ';

  // double click for F - Sozialsystem node child
  public static nodeIdFirstLetter = 'F';

  // Initial right content text
  public static neuesIntake = 'Neues Intake';
  public static neueBeratungsphase = 'Neue Beratungsphase';
  public static frmFallZugriff = 'Fallzugriff';
  public static frmFallInfo = 'Fallinfo';

  public static edittingIconLocation = '/assets/icon/svg/_ionicons_svg_md-create.svg';

  public static defaultRedirectUrl = 'B/Basis/';
}
