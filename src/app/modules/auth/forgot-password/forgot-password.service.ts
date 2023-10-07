import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private _httpClient: HttpClient) { }

  forgotPass(request)
  {
    return this._httpClient.post(`${environment.apiUrl}v1/forgotPass/spdcl`,request)
  }
 
  
}
