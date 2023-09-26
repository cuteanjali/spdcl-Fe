import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _httpClient: HttpClient) { }

  SaveorUpdateCourse(request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/saveOrUpdateCourse`,request)
  }
  SaveorUpdateEnroll(request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/enroll`,request)
  }
  UpdateEnroll(request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/updateCourseSessionEnrollment`,request)
  }
  DeleteParticipants(id,request): Observable<any> 
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/deleteCsEnrollment/`+id,request)
  }

  GetCourselist(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/listCourse`);
  }
  DeleteCourse(id,request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/deleteCourse/`+id,request);
  }
  GetallInstructor(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllInstructor/`+id);
  }
  GetInstructorById(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllCourseSessionEnrollmentByCourseId/`+id);
  }

  NonEnrollmentuser(): Observable<any> 
  {
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllNonCourseSessionEnrollmentUser`);
  }
  GetCoursesessionbyid(id): Observable<any>
  {
    return this._httpClient.get(`${environment.apiUrl}api/user/getCourseSession/`+id);
  }
  Getpaginationforcourse(request): Observable<any>
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/getAllCoursePagination`,request);
  }
  
  //getAllUsers
}
