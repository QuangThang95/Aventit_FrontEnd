export class AppConsts {

    static api: {
        baseUrl: string,
        baseUrlToken: string
    };

    static readonly page = {
        login: '/login',
        dossier: '/app/fallnavigator',
        persons: '/app/persons',
        pendenzen: '/app/pendenzenverwaltung',
        fallnavigator: '/app/fall-navigator',
        fallbearbeitung: '/app/fallbearbeitung',
        Pendenzenverwaltung: '/app/Pendenzenverwaltung',
        NeuerFall: '/app/NeuerFall'
    };

    static readonly paths = {
        imagesRoot: '/assets/images/',
        iconRoot: '/assets/icon/',
        userImageFolder: '/assets/images/users/'
    };

    static readonly localization = {
        languages: [
            {
                code: 'de',
                lang: '1',
                name: 'Deutsch',
                culture: 'de-CH',
                flag: 'famfamfam-flag-de'
            },
            {
                code: 'en',
                lang: '4',
                name: 'English',
                culture: 'en-EN',
                flag: 'famfamfam-flag-gb'
            },
            {
                code: 'fr',
                lang: '2',
                name: 'France',
                culture: 'fr-CH',
                flag: 'famfamfam-flag-fr'
            },
            {
                code: 'it',
                lang: '3',
                name: 'Italy',
                culture: 'it-CH',
                flag: 'famfamfam-flag-it'
            }
        ],
        defaultLanguage: 'de'
    };

    static readonly notifications = {
        options: {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            position: ['top', 'right'],
            theClass: 'sy-notification'
        },
        unauthorizedEndpoints: ['api/personen', 'api/trees', 'api/pendenzen', 'api/me/rights'],
        notFoundEndpoints: ['api/personen', 'connect/token', 'api/trees', 'api/pendenzen', 'api/me/rights']
    };

    static readonly tokens = {
        client_id: 'webclient.ro',
        client_secret: 'EA59A39A-B03D-4985-A4FA-9297663A1858',
        grant_type: 'password',
        scope: 'api'
    };
}
