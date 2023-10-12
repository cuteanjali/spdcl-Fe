import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class disconnectionService {

  constructor(private _httpClient: HttpClient) { }
  
  // GetallCourseSession(): Observable<any> {
  
  //   return this._httpClient.get(`${environment.apiUrl}api/user/getAllCourseSession`);
  // }
  // getworktype(request): Observable<any> {
  
  //   return this._httpClient.post(`${environment.apiUrl}api/user/getWorkTypeInsByLanguageType`,request);
  // }
  // GetallWorktype(): Observable<any> {
  
  //   return this._httpClient.get(`${environment.apiUrl}api/user/getAllWorkType`);
  // }
  // SaveWorktypedes(request)
  // {
  //   return this._httpClient.post(`${environment.apiUrl}api/user/saveWorkTypeInstruction`,request)
  // }
  // UpdateWorktypedes(request)
  // {
  //   return this._httpClient.post(`${environment.apiUrl}api/user/updateWorkTypeInstruction`,request)
  // }
  // DeleteWorkTypeInst(id,request): Observable<any> {
  
  //   return this._httpClient.post(`${environment.apiUrl}api/user/deleteWorkTypeInstruction/`+id,request);
  // }


  GetSessionTariff(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}v1/getSessionTariffByTariffType`,request);
  }

  getAllDisconnection(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/getAllDisconnection/spdcl`);
  }
  deleteDisconnection(id,request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}v1/deleteDisconnection/spdcl/`+id,request);
  }
  downloadDisconnection(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/downloadDisconnection/spdcl/`+id);
  }

  saveDisconnection(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}v1/saveDisconnection`,request);
  }
  getSearchDisconnection(key): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/getSearchDisconnection/spdcl/`+key);
  }
  getAllDisconnectionPagination(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}v1/getAllDisconnectionPagination/spdcl`,request);
  }
  getDisconnectionById(key): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/getDisconnectionById/spdcl/`+key);
  }
  viewDisconnectionById(key): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/viewDisconnectionById/spdcl/`+key);
  }
}
