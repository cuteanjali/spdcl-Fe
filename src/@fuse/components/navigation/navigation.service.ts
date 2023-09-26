import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { AdminNavigation } from 'app/mock-api/common/navigation/data';
import { environment } from 'environments/environment';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FuseNavigationService
{
    private _componentRegistry: Map<string, any> = new Map<string, any>();
    private _navigationStore: Map<string, FuseNavigationItem[]> = new Map<string, any>();
    private _authenticated: boolean = false;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register navigation component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: any): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister navigation component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get navigation component from the registry
     *
     * @param name
     */
    getComponent<T>(name: string): T
    {
        return this._componentRegistry.get(name);
    }

    /**
     * Store the given navigation with the given key
     *
     * @param key
     * @param navigation
     */
    storeNavigation(key: string, navigation: FuseNavigationItem[]): void
    {
        // Add to the store
        this._navigationStore.set(key, navigation);
    }

    /**
     * Get navigation from storage by key
     *
     * @param key
     */
    getNavigation(key: string): FuseNavigationItem[]
    {
        return this._navigationStore.get(key) ?? [];
    }

    /**
     * Delete the navigation from the storage
     *
     * @param key
     */
    deleteNavigation(key: string): void
    {
        // Check if the navigation exists
        if ( !this._navigationStore.has(key) )
        {
            console.warn(`Navigation with the key '${key}' does not exist in the store.`);
        }

        // Delete from the storage
        this._navigationStore.delete(key);
    }

    /**
     * Utility function that returns a flattened
     * version of the given navigation array
     *
     * @param navigation
     * @param flatNavigation
     * @param AdminNavigation
     */
    getFlatNavigation(navigation: FuseNavigationItem[], flatNavigation: FuseNavigationItem[] = []): FuseNavigationItem[]
    {
        for ( const item of navigation )
        {
            if ( item.type === 'basic' )
            {
                flatNavigation.push(item);
                continue;
            }

            if ( item.type === 'aside' || item.type === 'collapsable' || item.type === 'group' )
            {
                if ( item.children )
                {
                    this.getFlatNavigation(item.children, flatNavigation);
                }
            }
        }

        return flatNavigation;
    }
    GetAdminNavigation(navigation: FuseNavigationItem[], AdminNavigation: FuseNavigationItem[] = []): FuseNavigationItem[]
    {
        for ( const item of navigation )
        {
            if ( item.type === 'basic' )
            {
                AdminNavigation.push(item);
                continue;
            }

            if ( item.type === 'aside' || item.type === 'collapsable' || item.type === 'group' )
            {
                if ( item.children )
                {
                    this.GetAdminNavigation(item.children, AdminNavigation);
                }
            }
        }

        return AdminNavigation;
    }

    /**
     * Utility function that returns the item
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     */
    getItem(id: string, navigation: FuseNavigationItem[]): FuseNavigationItem | null
    {
        for ( const item of navigation )
        {
            if ( item.id === id )
            {
                return item;
            }

            if ( item.children )
            {
                const childItem = this.getItem(id, item.children);

                if ( childItem )
                {
                    return childItem;
                }
            }
        }

        return null;
    }

    /**
     * Utility function that returns the item's parent
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     * @param parent
     */
    getItemParent(
        id: string,
        navigation: FuseNavigationItem[],
        parent: FuseNavigationItem[] | FuseNavigationItem
    ): FuseNavigationItem[] | FuseNavigationItem | null
    {
        for ( const item of navigation )
        {
            if ( item.id === id )
            {
                return parent;
            }

            if ( item.children )
            {
                const childItem = this.getItemParent(id, item.children, item);

                if ( childItem )
                {
                    return childItem;
                }
            }
        }

        return null;
    }
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.apiUrl}api/user/loginAllUser`, credentials).pipe(
            switchMap((response: any) => {
                if (response.code == 200) {
                    // Store the access token in the local storage
                   // this.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE5MDEyODksImlzcyI6IkZ1c2UiLCJleHAiOjE2ODI1MDYwODl9.Tcb5Zfbh0WK25iMkyhTo6J0Zu2oGGsjyFOlfbwm8Or0";

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    // @ts-ignore
                    this._userService.user =  credentials.email;

                    window.localStorage.setItem('userLogin', JSON.stringify(credentials.email));

                    // Return a new observable with the response
                    return of(response);
                }
            })
        );
    }
}
