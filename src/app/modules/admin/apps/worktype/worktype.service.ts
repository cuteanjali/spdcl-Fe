import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorktypeService {

  constructor(private _httpClient: HttpClient) { }

  SaveSessionTariff(request)
  {
    return this._httpClient.post(`${environment.apiUrl}v1/saveSessionTariff`,request)
  }
  DeleteSessionTariff(id,request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}v1/deleteSessionTariff/spdcl/`+id,request);
  }
  getAllSessionTariff(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/getAllSessionTariff/spdcl`);
  }

  validateSessionTariff(type,session): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/validateSessionTariff/spdcl/`+type+"/"+session);
  }
}
