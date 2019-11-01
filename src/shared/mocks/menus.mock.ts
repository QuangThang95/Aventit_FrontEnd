import { MenuModel } from '@shared/models';

const MenusMock: Readonly<MenuModel>[] = [
  {
    id: '1',
    name: 'Menü',
    items: [
      {
        id: '1_1',
        name: 'person',
        sort: 1,
        iconSrc: 'assets/icon/item-menu.png',
        url: '/app/persons'
      },
      {
        id: '1_2',
        name: 'Dossier',
        iconSrc: 'assets/icon/item-menu.png',
        url: '/app/dossier',
        sort: 2
      },
      {
        id: '1_3',
        name: 'Ad hoc Reports',
        iconSrc: 'assets/icon/item-menu.png',
        url: '/test3',
        sort: 3
      }
    ]
  },
  {
    id: '2',
    name: 'Aktionen',
    items: [
      {
        id: '2_1',
        name: 'Neue Pendenz',
        iconSrc: 'assets/icon/item-menu.png',
        url: '/app/pendenzen',
        sort: 1
      },
      {
        id: '2_2',
        name: 'Aktion 2',
        iconSrc: 'assets/icon/item-menu.png',
        url: '',
        sort: 2
      },
      {
        id: '2_3',
        name: 'Aktion 3',
        iconSrc: 'assets/icon/item-menu.png',
        url: '',
        sort: 3
      }
    ]
  },
  {
    id: '3',
    name: 'Zuletzt geöffnete',
  }
];

export const MenuDatas = MenusMock;
