import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { WorktypeService } from 'app/modules/admin/apps/worktype/worktype.service';
import { AuthUtils } from './auth.utils';
import {environment} from '../../../environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(private inject: Injector,  private _httpClient: HttpClient,private _authService :AuthService )
    {

    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
/*
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authservice = this.inject.get(AuthService);
      
        let authreq = request;
        authreq = this.AddTokenheader(request, authservice.accessToken);
        return next.handle(authreq).pipe(
            catchError(errordata => {
              if (errordata.status === 403) {
                // need to implement logout
              
                // refresh token logic
              return this.handleRefrehToken(request, next);
              }
              return throwError(errordata);
            })
          );
    
      }
      handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
        let authservice = this.inject.get(AuthService);
        let obj ={
            "token":authservice.GetToken()
        }
        return this._httpClient.post(`${environment.apiUrl}v1/refreshToken`, obj).pipe(
          switchMap((data: any) => {
            console.log("===========datadata======"+data);
            
            authservice.SaveTokens(data);
            return next.handle(this.AddTokenheader(request,data.accessToken))
          }),
          catchError(errodata=>{
            authservice.signOut();
            return throwError(errodata)
          })
        );
      }

      AddTokenheader(request: HttpRequest<any>, token: any) {
        return request.clone({ headers: request.headers.set('Authorization',token) });
      }
*/
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // Clone the request object
        let newReq = req.clone();
        if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
        {
            newReq = req.clone({
                headers: req.headers.set('Authorization',  this._authService.accessToken)
            });
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {

                if ( error instanceof HttpErrorResponse && error.status === 403 )
                { 
                    let obj ={
                        "token":this._authService.GetToken()
                    }
                    return this._httpClient.post(`${environment.apiUrl}v1/refreshToken`, obj).pipe(
                        switchMap((data: any) => {
                          this._authService.SaveTokens(data);
                          newReq = req.clone({
                            headers: req.headers.set('Authorization',  data.accessToken)
                        });
                          return next.handle(newReq)
                        }),
                        catchError(errodata=>{
                            this._authService.signOut();
                            
                          return throwError(errodata)
                        })
                    )
                      
                }
                this._authService.signOut();
                return throwError(error);
            })
        );
    }

   
}
