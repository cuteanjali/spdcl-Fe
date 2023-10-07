import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, executiveAssistantNavigation, defaultNavigation, adminNavigation, itAssistantNavigation} from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi 
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    _defaultNavigation: FuseNavigationItem[] = [];
    //rivate readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
  //  private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;
 //   private readonly _AdminNavigation: FuseNavigationItem[] = AdminNavigation;
    
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers   
        this.registerHandlers();
    }
    
    private setNavigation() {
        this._defaultNavigation = [];
        const role  = window.localStorage.getItem('role');
        if(role) {
            const subscription = window.localStorage.getItem('subscriptionType');
            switch (role.toString().toUpperCase()) {
                case 'ADMIN':
                    this._defaultNavigation = adminNavigation;
                    break;
                case 'EXECUTIVE ASSISTANT':
                    this._defaultNavigation = executiveAssistantNavigation;
                    
                    break;
                case 'IT ASSISTANT':
                    this._defaultNavigation = itAssistantNavigation;
                    break;
             
            }
        }
        
    }
    registerHandlers(): void
    {
        // if(this.loginuser==='Admin')
        // {
        //     this._defaultNavigation=defaultNavigation;
        // }
        // else{
        //   //  this._defaultNavigation=AdminNavigation;
        // }
        this.setNavigation();
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

           
          
                

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                   
                       
                    }
                ];
            });
         
    }
}
