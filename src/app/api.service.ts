import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl=environment.baseUrl;
  baseUrl1=this.baseUrl+"/doLogin";
  getCoursesUrl=this.baseUrl+"/getCourses"
  getSaveTeacherRequestUrl=this.baseUrl+"/saveTeacherRequest"
  getSaveStudentUrl=this.baseUrl+"/saveStudent"
  getResetPassordUrl=this.baseUrl+"/resetPassword"
  constructor(private httpClient:HttpClient) { }

  resetPassword(e):Observable<any>{
    return this.httpClient.post(this.getResetPassordUrl,e);
  }
   postData(e):Observable<any>{
      return  this.httpClient.post(this.baseUrl1,e);
  }
  getCourses():Observable<any>{
    return this.httpClient.get(this.getCoursesUrl);
  }
  saveTeacher(e):Observable<any>{
    return this.httpClient.post(this.getSaveTeacherRequestUrl,e);
  }
  saveStudent(e):Observable<any>{
    return this.httpClient.post(this.getSaveStudentUrl,e);
  }
}
