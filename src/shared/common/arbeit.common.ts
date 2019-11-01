export enum ErwerbssituationsCode {

    Selbstandig = 1,
    AngestelltInDerEigenenFirma = 2,
    RegelmaessigAngestellt = 3,
    ZeitlichBefristeterVertrag = 4,
    ArbeitAufAbruf = 5,
    Gelegenheitsarbeit = 6,
    MitarbeitendesFamilienmitglied = 7,
    InDerLehre = 8,
    Arbeitsintegrationsprogramm = 9,
    BeschaeftigungsprogrammFuerAusgesteuerte = 10,
    AufStellensucheBeimArbeitsamtGemeldet = 11,
    AufStellensucheNichtBeimArbeitsamtGemeldet = 12,
    InAusbildungOhneLehrlinge = 13,
    HaushaltFamiliäreGruende = 14,
    Rentner = 15,
    VoruebergehendArbeitsunfaehig = 16,
    Dauerinvaliditaet = 17,
    KeineChanceAufDemArbeitsmarkt = 18,
    AnderesErwerbstaetig = 20,
    AnderesAufArbeitssuche = 21,
    AnderesNichtErwerbstaetig = 22,
    Arbeitsverbot = 27,
    NichtFestgestellt = 99999
}

export class ArbeitConstant {

    public static PAGETITLE = 'Arbeit';
    public static ErwerbssituationStatus1Code = 'erwerbssituationStatus1Code';
    public static ErwerbssituationStatus2Code = 'erwerbssituationStatus2Code';
    public static ErwerbssituationStatus3Code = 'erwerbssituationStatus3Code';
    public static ErwerbssituationStatus4Code = 'erwerbssituationStatus4Code';
    public static BeschaeftigungsGradCode = 'beschaeftigungsGradCode';
    public static GrundTeilzeitarbeit1Code = 'grundTeilzeitarbeit1Code';
    public static GrundTeilzeitarbeit2Code = 'grundTeilzeitarbeit2Code';
    public static BrancheCode = 'brancheCode';
    public static HoechsteAusbildungCode = 'hoechsteAusbildungCode';
    public static AbgebrochenAusbildungCode = 'abgebrochenAusbildungCode';
    public static IntegrationsstandCode = 'integrationsstandCode';
    public static AusgesteuertUnbekanntCode = 'ausgesteuertUnbekanntCode';
    public static Erwerbssituation = 'erwerbssituation';
    public static Beschaeftigungsgrad = 'beschaeftigungsgrad';
    public static Grundteilzeit = 'grundteilzeit';
    public static Branche = 'branche';
    public static Ausbildungstyp = 'ausbildungstyp';
    public static Integrationsstand = 'integrationsstand';
    public static Nichtbekannt = 'nichtbekannt';
    public static WieOftArbeitslos = 'wieOftArbeitslos';
    public static Beruf = 'beruf';
    public static ErlernterBeruf = 'erlernterBeruf';
    public static Arbeitgeber = 'arbeitgeber';
    public static Arbeitszeit = 'arbeitszeit';
    public static AusgesteuertDatum = 'ausgesteuertDatum';
    public static StempelDatum = 'stempelDatum';
    public static URLErwerbssituation = 'Erwerbssituation';
    public static URLBeschaeftigungsgrad = 'Beschaeftigungsgrad';
    public static URLGrundteilzeit = 'Grundteilzeit';
    public static URLBranche = 'Branche';
    public static URLAusbildungstyp = 'Ausbildungstyp';
    public static URLIntegrationsstand = 'Integrationsstand';
    public static URLNichtbekannt = 'Nichtbekannt';
    public static Save = 'speichern';
    public static Edit = 'bearbeiten';
    public static Cancel = 'abbrechen';
    public static IsVariableArbeitszeit = 'isVariableArbeitszeit';
    public static arbeitMaxNumber = 99;
    public static arbeitMinNumber = -99;
    public static wieMaxUpdate = 29;
    public static wieMaxAddNew = 10;
    public static codeA = 48;
    public static codeZ = 57;
    public static ArrowUp = 'ArrowUp';
    public static ArrowDown = 'ArrowDown';
    public static regexInputFocus = /(\d)(?=(\d{3})+(?!\d))/g;
    public static regexInputNumberNavigate = /^-?\d+$/;
    public static regexInputInteger = /[^0-9]/g;
    public static RegexFloatNumber = /^(-0|-?[1-9]\d*|0)(?:\.\d{0,2})?$/;
    public static RegexIntegerNumber = /^(-?[1-9]\d*|0)$/;
    public static arbeitszeitFormat = '#0,###.##';
    public static wieOftArbeitslosFormat = '#0,###';
    public static maxWieOftArbeitslos = 999999999;
    public static minWieOftArbeitslos = -999999999;
    public static minDate: Date = new Date(1753, 1, 1);
    public static maxDate: Date = new Date(9999, 12, 31);
    public static dateLenght = 10;
    public static screenLargeWidth = 1300;
}


