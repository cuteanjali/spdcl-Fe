import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotworkerWorkHistoryService {

  constructor(private _httpClient: HttpClient) { }

  Getallhotworkers(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/getHotWorkersByContractor`,request);
  }
  GetHotworkerdata(id,request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/getHotworkerWorkData/`+id,request);
  }
  DownloadHotworkerdata(workAddressId): Observable<any> 
  {
    return this._httpClient.get(`${environment.apiUrl}api/user/hotworkerWorkRouteDownload/`+workAddressId)

  }

  getWorkAddressById(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getWorkAddressById/`+id);
  }
  
  downloadcertificatebyid(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/userCertificateDownload`,request);
  }
 

  getUserById(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getUserById/`+id);
  }
  
}
