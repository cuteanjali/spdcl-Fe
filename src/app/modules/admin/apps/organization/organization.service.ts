import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private _httpClient: HttpClient) { }

  Getallorganisations(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllOrgs`);
  }
  SaveorUpdateOrganisation(request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/saveOrUpdateOrg`,request)
  }

}
