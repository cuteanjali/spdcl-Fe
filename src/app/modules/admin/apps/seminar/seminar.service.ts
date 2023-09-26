import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeminarService {

  constructor(private _httpClient: HttpClient) { }

  GetallCourseSession(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllCourseSession`);
  }
  
  GetallCourse(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllActiveCourse`);
  }
  CreateCourse(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/createCourseSessions`,request);
  }
  updateCourseSessions(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/updateCourseSessions`,request);
  }
  GetallInstructor(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllInstructor/`+id);
  }
  DeleteCourse(id,request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/deleteCourseSession/`+id,request);
  }
  
}
