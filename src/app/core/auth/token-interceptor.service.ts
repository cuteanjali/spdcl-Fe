import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError, BehaviorSubject, switchMap, filter, take } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject: Injector,private _httpClient: HttpClient) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(AuthService);
    let authreq = request;
    authreq = this.AddTokenheader(request, authservice.getaccessToken); 
    return next.handle(authreq).pipe(
      catchError(errordata => {
        if (errordata.status === 403) {
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



}
