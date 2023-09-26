/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';



//export let AdminNavigation: FuseNavigationItem[]
// if(this.role=='Admin')
// {
    export const defaultNavigation: FuseNavigationItem[] = [
       /* {
            id   : 'Session Tariff',
            title: 'Session Tariff',
            titleKey: 'SIDENAV.S1',
            type : 'basic',
            icon : 'heroicons_outline:user',
            link : '/apps/sessionTariff'
        }
        ,
       {
            id   : 'organization',
            title: 'Organization',
            titleKey:'SIDENAV.S9',
            type : 'basic',
            icon : 'heroicons_outline:office-building',
            link : '/apps/organization'
        },
        
        {
            id   : 'course',
            title: 'Course',
            titleKey: 'SIDENAV.S2',
            type : 'basic',
            icon : 'heroicons_outline:academic-cap',
            link : '/apps/course'
        },
        {
            id   : 'questions',
            title: 'Exam',
            titleKey: 'SIDENAV.S3',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-list',
            link : '/apps/questions'
        },*/
        
        {
            id   : 'Session Tariff',
            title: 'Session Tariff',
            titleKey: 'SIDENAV.S1',
            type : 'basic',
            icon : 'heroicons_outline:annotation',
            link : '/apps/sessionTariff'
        },
        {
            id   : 'Disconnection',
            title: 'Disconnection',
            titleKey: 'SIDENAV.S4',
            type : 'basic',
            icon : 'heroicons_outline:check-circle',
            link : '/apps/disconnection'
        }
        /*,
        {
            id   : 'examresult',
            title: 'Results',
            titleKey: 'SIDENAV.S6',
            type : 'basic',
            icon : 'heroicons_outline:document-text',
            link : '/apps/exam-result'
        },
        {
            id   : 'workersdetails',
            title: 'Workers Certificate Details',
            titleKey: 'SIDENAV.S7',
            type : 'basic',
            icon : 'heroicons_outline:users',
            link : '/apps/workersdetails'
        },
        {
            id   : 'hotworker-work-history',
            title: 'Hot Worker Work History',
            titleKey: 'SIDENAV.S8',
            type : 'basic',
            icon : 'heroicons_outline:user-group',
            link : '/apps/hotworker-work-history'
        }*/
    ]

    export const contractorNavigation: FuseNavigationItem[] = [
        // {
        //     id   : 'users',
        //     title: 'Users',
        //     titleKey: 'SIDENAV.S1',
        //     type : 'basic',
        //     icon : 'heroicons_outline:user',
        //     link : '/apps/users'
        // },
        {
            id   : 'hotworker-work-history',
            title: 'Hot Worker Work History',
            titleKey: 'SIDENAV.S8',
            type : 'basic',
            icon : 'heroicons_outline:user-group',
            link : '/apps/hotworker-work-history'
        },
        {
            id   : 'pages.settings',
            title: 'Settings',
            titleKey: 'SIDENAV.S12',
            type : 'basic',
            icon : 'heroicons_outline:cog',
            link : '/pages/settings'
        }
    ]

    export const instructorNavigation: FuseNavigationItem[] = [
        {
            id   : 'users',
            title: 'My Cert',
            titleKey: 'SIDENAV.S10',
            type : 'basic',
            icon : 'heroicons_outline:user',
            link : '/apps/users'
        },
        {
            id   : 'course',
            title: 'Course',
            titleKey: 'SIDENAV.S2',
            type : 'basic',
            icon : 'heroicons_outline:academic-cap',
            link : '/apps/course'
        },
        {
            id   : 'questions',
            title: 'Exam',
            titleKey: 'SIDENAV.S3',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-list',
            link : '/apps/questions'
        },
        {
            id   : 'examresult',
            title: 'Results',
            titleKey: 'SIDENAV.S6',
            type : 'basic',
            icon : 'heroicons_outline:document-text',
            link : '/apps/exam-result'
        },
        {
            id   : 'pages.settings',
            title: 'Settings',
            titleKey: 'SIDENAV.S12',
            type : 'basic',
            icon : 'heroicons_outline:cog',
            link : '/pages/settings'
        }
    ]

    export const instructorWithSubNavigation: FuseNavigationItem[] = [
        {
            id   : 'users',
            title: 'My Cert',
            titleKey: 'SIDENAV.S10',
            type : 'basic',
            icon : 'heroicons_outline:user',
            link : '/apps/users'
        },

        {
            id   : 'course',
            title: 'Course',
            titleKey: 'SIDENAV.S2',
            type : 'basic',
            icon : 'heroicons_outline:academic-cap',
            link : '/apps/course'
        },
        {
            id   : 'questions',
            title: 'Exam',
            titleKey: 'SIDENAV.S3',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-list',
            link : '/apps/questions'
        },
        {
            id   : 'examresult',
            title: 'Results',
            titleKey: 'SIDENAV.S6',
            type : 'basic',
            icon : 'heroicons_outline:document-text',
            link : '/apps/exam-result'
        },
        {
            id   : 'workersdetails',
            title: 'Workers Certificate Details',
            titleKey: 'SIDENAV.S7',
            type : 'basic',
            icon : 'heroicons_outline:users',
            link : '/apps/workersdetails'
        },
        {
            id   : 'pages.settings',
            title: 'Settings',
            titleKey: 'SIDENAV.S12',
            type : 'basic',
            icon : 'heroicons_outline:cog',
            link : '/pages/settings'
        }
    ]

    export const hotWorkerNavigation: FuseNavigationItem[] = [
        {
            id   : 'users',
            title: 'My Cert',
            titleKey: 'SIDENAV.S10',
            type : 'basic',
            icon : 'heroicons_outline:user',
            link : '/apps/users'
        }
    ]

    export const inspectorNavigation: FuseNavigationItem[] = [
        {
            id   : 'users',
            title: 'My Cert',
            titleKey: 'SIDENAV.S10',
            type : 'basic',
            icon : 'heroicons_outline:user',
            link : '/apps/users'
        },
        {
            id   : 'questions',
            title: 'Exam',
            titleKey: 'SIDENAV.S3',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-list',
            link : '/apps/questions'
        },
        {
            id   : 'pages.settings',
            title: 'Settings',
            titleKey: 'SIDENAV.S12',
            type : 'basic',
            icon : 'heroicons_outline:cog',
            link : '/pages/settings'
        }
    ]
    /*
    defaultNavigation = [
        {
            id: 'apps',
            // title   : 'Applications',
            // subtitle: 'Custom made application designs',
            type: 'group',
            icon: 'heroicons_outline:home',
            children: [

                {
                    id: 'apps.users',
                    title: 'Users',
                    type: 'basic',
                    icon: 'heroicons_outline:user',
                    link: '/apps/users'
                },
                {
                    id: 'apps.course',
                    title: 'Course',
                    type: 'basic',
                    icon: 'heroicons_outline:academic-cap',
                    link: '/apps/course',

                },
                
                {
                    id: 'apps.questions',
                    title: 'Exam',
                    type: 'basic',
                    icon: 'heroicons_outline:clipboard-list',
                    link: '/apps/questions'
                },
                {
                    id: 'apps.instruction',
                    title: 'Terms and Condition',
                    type: 'basic',
                    icon: 'heroicons_outline:check-circle',
                    link: '/apps/instruction'
                },
                {
                    id: 'apps.worktype',
                    title: 'Work Type',
                    type: 'basic',
                    icon: 'heroicons_outline:annotation',
                    link: '/apps/worktype'
                },
               
                // {
                //     id: 'apps.seminar',
                //     title: 'Seminar',
                //     type: 'basic',
                //     icon: 'heroicons_outline:view-boards',
                //     link: '/apps/seminar'
                // },
                {
                    id: 'apps.examresult',
                    title: 'Exam Result',
                    type: 'basic',
                    icon: 'heroicons_outline:annotation',
                    link: '/apps/exam-result'
                }
            ]
        }


    ];*/

    /*
    AdminNavigation = [
        {
            id: 'apps',
            // title   : 'Applications',
            // subtitle: 'Custom made application designs',
            type: 'group',
            icon: 'heroicons_outline:home',
            children: [

                {
                    id: 'apps.users',
                    title: 'Users',
                    type: 'basic',
                    icon: 'heroicons_outline:user',
                    link: '/apps/users'
                },
                
                {
                    id: 'apps.course',
                    title: 'Course',
                    type: 'basic',
                    icon: 'heroicons_outline:academic-cap',
                    link: '/apps/course',

                },
                {
                    id: 'apps.questions',
                    title: 'Exam',
                    type: 'basic',
                    icon: 'heroicons_outline:clipboard-list',
                    link: '/apps/questions'
                },

            ]
        }


    ];*/
    export const AdminNavigation: FuseNavigationItem[] = [
        {
            id   : 'course',
            title: 'Course',
            titleKey: 'SIDENAV.S2',
            type : 'basic',
            icon : 'heroicons_outline:academic-cap',
            link : '/apps/course'
        },
        {
            id   : 'questions',
            title: 'Exam',
            titleKey: 'SIDENAV.S3',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-list',
            link : '/apps/questions'
        },
        {
            id   : 'examresult',
            title: 'Results',
            titleKey: 'SIDENAV.S6',
            type : 'basic',
            icon : 'heroicons_outline:document-text',
            link : '/apps/exam-result'
        },
        {
            id   : 'workersdetails',
            title: 'Workers Certificate Details',
            titleKey: 'SIDENAV.S7',
            type : 'basic',
            icon : 'heroicons_outline:users',
            link : '/apps/workersdetails'
        },
        {
            id   : 'hotworker-work-history',
            title: 'Hot Worker Work History',
            titleKey: 'SIDENAV.S8',
            type : 'basic',
            icon : 'heroicons_outline:user-group',
            link : '/apps/hotworker-work-history'
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

