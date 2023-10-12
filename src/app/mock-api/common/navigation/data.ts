/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';



//export let AdminNavigation: FuseNavigationItem[]
// if(this.role=='Admin')
// {
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'Session Tariff',
        title: 'Session Tariff',
        titleKey: 'SIDENAV.S1',
        type: 'basic',
        icon: 'heroicons_outline:annotation',
        link: '/apps/sessionTariff'
    },
    {
        id: 'Disconnection',
        title: 'Disconnection',
        titleKey: 'SIDENAV.S4',
        type: 'basic',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/disconnection'
    },
    {
        id: 'apps.employee',
        title: 'Employee',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/apps/employee'
    },
    {
        id: 'apps.role',
        title: 'Role',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/apps/role'
    }
   
]
export const adminNavigation: FuseNavigationItem[] = [
    {
        id: 'Session Tariff',
        title: 'Session Tariff',
        titleKey: 'SIDENAV.S1',
        type: 'basic',
        icon: 'heroicons_outline:annotation',
        link: '/apps/sessionTariff'
    },
    {
        id: 'Disconnection',
        title: 'Disconnection',
        titleKey: 'SIDENAV.S4',
        type: 'basic',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/disconnection'
    },
    {
        id: 'apps.employee',
        title: 'Employee',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/apps/employee'
    },
    {
        id: 'apps.role',
        title: 'Role',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/apps/role'
    },
    {
        id: 'apps.bill-correction',
        title: 'Correction',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/apps/correction'
    }
   
]
export const executiveAssistantNavigation: FuseNavigationItem[] = [
  
    {
        id: 'Disconnection',
        title: 'Disconnection',
        titleKey: 'SIDENAV.S4',
        type: 'basic',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/disconnection'
    }
]
export const itAssistantNavigation: FuseNavigationItem[] = [
    {
        id: 'apps.employee',
        title: 'Employee',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/apps/employee'
    },
    {
        id: 'apps.role',
        title: 'Role',
        type: 'basic',
        icon: 'heroicons_outline:document-text',
        link: '/apps/role'
    },
    {
        id: 'Disconnection',
        title: 'Disconnection',
        titleKey: 'SIDENAV.S4',
        type: 'basic',
        icon: 'heroicons_outline:check-circle',
        link: '/apps/disconnection'
    }
]



export const compactNavigation: FuseNavigationItem[] = [
    /* {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    } */
];
export const futuristicNavigation: FuseNavigationItem[] = [
    /* {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    } */
];
export const horizontalNavigation: FuseNavigationItem[] = [
    /* {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    } */
];
//}

