import { SidebarMenuModel } from '@shared/models';

const SidebarMenuMock: Readonly<SidebarMenuModel>[] = [
    { id: 2, name: 'Dashboard', iconFa: 'fa-dashboard', parentId: null, url: '/dashboard' },
    {
        id: 3, name: 'Dossier', iconFa: 'fa-user', parentId: null, url: '/dossier',
        queryParams: {
            'UserId': 2080,
            'Active': true,
            'Closed': false,
            'Archived': false,
            'IncludeGroup': false,
            'IncludeGuest': false,
            'IncludeTasks': false
        }
    },
    { id: 4, name: 'Persons', iconFa: 'fa-product-hunt', parentId: null, url: '/persons' },
    { id: 5, name: 'Languages', iconFa: 'fa-language', parentId: null, url: '/lang' },
    { id: 6, name: 'Roles', iconFa: 'fa-user-md', parentId: null, url: '/roles' },
    { id: 7, name: 'Setttings', iconFa: 'fa-cog', parentId: null, url: '/settings' }
];

export const SidebarMenuDatas = SidebarMenuMock;
