import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class employeeService {

  constructor(private _httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/getAllUsers/spdcl`);
  }
  
  saveUser(request)
  {
    return this._httpClient.post(`${environment.apiUrl}v1/saveUser`,request)
  }
  
  getAllRoles(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}v1/getAllRoles/spdcl`);
  }
}
