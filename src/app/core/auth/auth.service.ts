import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {environment} from '../../../environments/environment';
import { TariffService } from 'app/modules/admin/apps/Tariff/Tariff.service';


@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    orgsId=[]
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,private _service: TariffService,
    ) {}
  
    ngAfterViewInit() {
        //this.GenerateRefreshToken();
    }
    //   GenerateRefreshToken() {
    //     let obj = {
    //         "token" : this.GetToken()
    //     }
      
    //       this._service.getRefreshToken(obj).subscribe((el) => {
    //         if (el){
    //           console.log("================exxpppppppppppppppppp==========="+el['accessToken']);
              
    //         }
    //      });
    //     // return this._service.getRefreshToken(obj)
    //   }
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    GetToken() {
        return localStorage.getItem("token") || '';
      }

      SaveTokens(tokendata: any) {
        localStorage.setItem('token', tokendata.token);
        localStorage.setItem('accessToken', tokendata.accessToken);
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

     
    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string;role:string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.apiUrl}v1/login/spdcl`, credentials).pipe(
            switchMap((response: any) => {
                if (response.status == "Success") {
                
                    // Store the access token in the local storage
                    this.accessToken =  response.data.accessToken// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE5MDEyODksImlzcyI6IkZ1c2UiLCJleHAiOjE2ODI1MDYwODl9.Tcb5Zfbh0WK25iMkyhTo6J0Zu2oGGsjyFOlfbwm8Or0";

                    // Set the authenticated flag to true
                    this._authenticated = true;
                     
                    // Store the user on the user service
                    // @ts-ignore
                    this._userService.user =  credentials.email;
                    window.localStorage.setItem('userLogin',credentials.email);
                    window.localStorage.setItem('role', response.data.role);
                    window.localStorage.setItem('id', response.data.id);
                    window.localStorage.setItem('accessToken', response.data.accessToken);
                    window.localStorage.setItem('token', response.data.token);
                     window.localStorage.setItem('firstname', response.data.firstName);

                     window.localStorage.setItem('lastname', response.data.lastName);
                    // response.data.userOrgs.forEach(element => {
                    //     console.log('check elements ',element)
                    //     this.orgsId.push(element.orgId)  
                    // })
                   // window.localStorage.setItem('orgId',this.orgsId.toString())
                    // Return a new observable with the response
                    return of(response);
                }else{
                    return of(response);
                }
            })
        );
    }

  
    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
       // alert("Your session expired!")
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        window.localStorage.clear();
        // Set the authenticated flag to false
      //  this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */

    signUp(user: { firstName: string; lastName: string; jobFunction: string; email: string; password: string; phone: string }): Observable<any> {
        return this._httpClient.post(`${environment.apiUrl}/api/v1/createUser`, user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in

        if (this._authenticated) {
            return of(true);
        }

        // manual check
        if(this.accessToken){
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    getUserSubscription(userId): Observable<any> {
        return this._httpClient.get(`${environment.apiUrl}api/user/getUserSubscription/`+userId);
    }

    getOrgSubscription(orgId): Observable<any> {
        return this._httpClient.get(`${environment.apiUrl}api/user/getOrgSubscription/`+orgId);
    }
}
