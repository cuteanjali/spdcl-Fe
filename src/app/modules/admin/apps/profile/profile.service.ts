import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private _httpClient: HttpClient) {}


  updatePass(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}v1/updatePass/spdcl`,request)
  }
  updateProfile(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}v1/updateProfile/spdcl`,request)
  }
}
