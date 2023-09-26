import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _httpClient: HttpClient) { }

  GetallCourse(): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllActiveCourse`);
  }
  GetallInstructor(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllInstructor/`+id);
  }

  GetExamPagination(request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/getAllCourseQuestionPagination`,request);
  }
  SaveExam(request): Observable<any>{
    
    return this._httpClient.post(`${environment.apiUrl}api/user/saveCourseSessionQuestion`,request)
  }
  SaveExamSets(request): Observable<any>{
    return this._httpClient.post(`${environment.apiUrl}api/user/saveOrUpdateCourseSessionExamSet`,request)
    
  }
  UpdateExam(request): Observable<any>{
    
    return this._httpClient.post(`${environment.apiUrl}api/user/updateCourseSessionQuestion`,request)
  }
  GetQuestions(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getAllCourseSessionsQuestionById/`+id);
  }
  DeleteCourse(id,request): Observable<any> {
  
    return this._httpClient.post(`${environment.apiUrl}api/user/deleteExamDetail/`+id,request);
  }

  SaveQuestions(id,request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/saveBulkCourseSessionQuestionByExamId/`+id,request)
  }
  updateCourseSessionQuestionByExamId(id,request)
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/updateCourseSessionQuestionByExamId/`+id,request)
  }
  CheckCourseandlanguagebyid(id,examLanguage): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/checkCourseExam/`+id+`/`+examLanguage);
  }

  getExamLanguage(id): Observable<any> {
  
    return this._httpClient.get(`${environment.apiUrl}api/user/getExamLanguage/`+id);
  }

  DeleteQuestion(id,request): Observable<any> 
  {
    return this._httpClient.post(`${environment.apiUrl}api/user/deleteCourseSessionQuestion/`+id,request);
  }
  ImportQuestionpdf(request)
  {
    
    return this._httpClient.post(`${environment.apiUrl}api/user/importQuestionChoices`,request);

  }
    upload(file): Observable<any> {

      const formData = new FormData();

      formData.append('file', file, file.name);
  
      return this._httpClient.post(`${environment.apiUrl}api/user/importQuestionChoices`, formData);
    }

    GetExamSetbyexamid(id): Observable<any>
    {
      return this._httpClient.get(`${environment.apiUrl}api/user/getCourseSessionExamSetByExamId/`+id);
    }
}


