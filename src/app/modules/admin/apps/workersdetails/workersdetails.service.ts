import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkersdetailsService {

  constructor(private _httpClient: HttpClient) { }

  Getallhotworkers(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/getAllHotWorkerPagination`,request);
  }
  downloadcertificatebyid(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/userCertificateDownload`,request);
  }
}
