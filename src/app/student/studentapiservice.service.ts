import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentapiserviceService {
  baseUrl=environment.studentBaseUrl;
  baseUrl1=environment.teacherBaseUrl;
  getDownloadNotesUrl=this.baseUrl1+"/download"
  getStudentDailyNotesUrl=this.baseUrl+"/getStudentDailyNotes"
  getStudentSemesterNotesUrl=this.baseUrl+"/getStudentSemesterNotes"
  getStudentCourseUrl=this.baseUrl+"/getStudentCourse"
  getStudentUpdateUrl=this.baseUrl+"/getStudentUpdate"
  getStudentCourseDetialUrl=this.baseUrl+"/getStudentCourseDetail"
  constructor(private httpClient:HttpClient) { }
  header= new HttpHeaders().set('Access-Control-Allow-Origin','*')
  .set('Authorization','Bearer '+sessionStorage.getItem('token'))
  .set('Content-Type','application/json')
  .set('Access-Control-Allow-Origin','*')
  
  header1= new HttpHeaders().set('Access-Control-Allow-Origin','*')
  .set('Authorization','Bearer '+sessionStorage.getItem('token'))
  .set( "Accept","application/json" )
  .set('X-Frame-Options', 'GOFORIT')
  .set('Access-Control-Allow-Origin','*')

  header2= new HttpHeaders()
  .set('Authorization','Bearer '+sessionStorage.getItem('token'))
  .set('observe','response')
  .set('responseType','blob')
  .set('reportProgress','true')
  getStudentDetail(e):Observable<any>{
    return this.httpClient.post(this.getStudentCourseDetialUrl,e,{'headers':this.header})
  }
  getStudentUpdate(e):Observable<any>{
    return this.httpClient.post(this.getStudentUpdateUrl,e,{'headers':this.header})
  }
  getStudentDailyNotes(e):Observable<any>{
    return this.httpClient.post(this.getStudentDailyNotesUrl,e,{'headers':this.header});
  }
  getStudentCourse(e):Observable<any>{
    return this.httpClient.post(this.getStudentCourseUrl,e,{'headers':this.header})
  }
  downloadNotes(e):Observable<any>{
    const params = new HttpParams({
      fromObject:{
        name:e.name,
        check:e.check
      }
    });
    return this.httpClient.get(this.getDownloadNotesUrl,{ reportProgress: true,
    observe: 'events', responseType: 'blob',headers:this.header1,params:params})
  }
  getStudentSemesterNotes(e):Observable<any>{
    return this.httpClient.post(this.getStudentSemesterNotesUrl,e,{'headers':this.header})
  }
}
