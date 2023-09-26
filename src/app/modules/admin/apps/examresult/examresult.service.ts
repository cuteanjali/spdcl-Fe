import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExamresultService {

  
  constructor(private _httpClient: HttpClient) { }

  
  getAllStudentExamDetails(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllStudentExamDetails`);
  }
  getAllstudentExamResultById(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllstudentExamResultByExamId/`+id);
  }
  getExamLanguage(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getExamLanguage/`+id);
  }
  GetExamPagination(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/getAllCourseQuestionPagination`,request);
  }
  GetExamQuestionsPdf(request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/userExamDownload`,request);
  }
  examResultView(examId)
  {
    return this._httpClient.get(`${environment.apiUrl}api/user/examResultView/`+examId);
  }
  updatemarks(request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/updateMarks`,request);
  }
  getExamResultData(examId)
  {
    return this._httpClient.get(`${environment.apiUrl}api/user/getExamResultData/`+examId);
  }
  
}
