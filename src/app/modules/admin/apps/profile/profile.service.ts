import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private _httpClient: HttpClient) {}

  Getalluserdetails(request): Observable<any> {
    return this._httpClient.post(
      `${environment.apiUrl}api/user/getUser`,
      request
    );
  }
  GetallRole(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllRole`);
  }
  Getallorganisations(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllOrgs`);
  }
  SaveSubsriptionUser(userId, request) {
    return this._httpClient.post(
      `${environment.apiUrl}api/user/saveUserSubscription/` + userId,
      request
    );
  }
  getUserSubscription(userId): Observable<any> {
    return this._httpClient.get(
      `${environment.apiUrl}api/user/getUserSubscription/` + userId
    );
  }
  SaveSubsriptionOrganisation(orgId, request) {
    return this._httpClient.post(
      `${environment.apiUrl}api/user/saveOrgSubscription/` + orgId,
      request
    );
  }
  getOrgSubscription(orgId): Observable<any> {
    return this._httpClient.get(
      `${environment.apiUrl}api/user/getOrgSubscription/` + orgId
    );
  }
  UpdateUser(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/updateUser`,request)
  }

  AssignRole(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/assignRole`,request)
  }

  AssignOrganization(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/assignOrg`,request)
  }
}
