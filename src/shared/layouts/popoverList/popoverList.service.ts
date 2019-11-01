import { Injectable } from '@angular/core';
import { parseMenuItems } from '@shared/utilites/utilityHelpers';

export class PopoverData {
    id: string;
    name: string;
    items: any;
    icon?: string;
    sort?: number;
    disabled?: boolean;
    url?: string;
}

const popoverDatas: PopoverData[] = [{
    id: '8',
    name: 'Hilfe',
    items: [
        {
            id: '1209 ',
            name: 'Handbücher',
            items: [],
            url: '/app/manuals'
        },
        {
            id: '801',
            name: 'Inhalt',
            items: [],
            url: '/app/content'
        },
        {
            id: '802',
            name: 'Index',
            items: [],
            url: '/app/index'
        },
        {
            id: '803',
            name: 'TeamViewer starten (Fernwartung)',
            items: [],
            url: '/app/teamview'
        },
        {
            id: '804',
            name: 'JIRA starten (Wartungsprotokoll)',
            items: [],
            url: '/app/jira'
        },
        {
            id: '805',
            name: 'Über',
            items: [],
            url: '/app/uber'
        }
    ],
    url: ''
},
{
    id: '1232',
    name: 'Link',
    items: [],
    url: '/app/link'
}
];

@Injectable()
export class Service {
    getPopoverDatas(): PopoverData[] {
        return parseMenuItems(popoverDatas);
    }
}
