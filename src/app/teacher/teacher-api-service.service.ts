import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherApiServiceService {
  baseUrl=environment.teacherBaseUrl;
  getTeacherCoursesUrl=this.baseUrl+"/getTeacherCourses"
  getTeacherNotesStoreUrl=this.baseUrl+"/addNotes"
  getNotesUrl=this.baseUrl+"/getDailyNotes"
  getOneDailyNotesDeleteUrl=this.baseUrl+"/deleteOneDailyNote"
  getCompleteNoteDeleteUrlFormSemester=this.baseUrl+"/deleteCompleteSemesterNotes"
  getOneCompleteNotesDeleteUrl=this.baseUrl+"/deleteOneCompleteNote"
  getOneCompleteNotesDeleteFromSemesterUrl=this.baseUrl+"/deleteSemesterNote"
  getNoteUpdateUrl=this.baseUrl+"/updateNotes"
  getSemesterNoteUpdateUrl=this.baseUrl+"/updateSemesterNotes"
  getAllNotesUrl=this.baseUrl+"/getAllDailyNotes"
  getDownloadNotesUrl=this.baseUrl+"/download"
  getAllSemesterNotesUrl=this.baseUrl+"/getAllNotes"
  getAddNotesToDailyNotesUrl=this.baseUrl+"/addNotesToDailyNotes"
  getUpdateTeacherUrl=this.baseUrl+"/updateTeacher"
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
  constructor(private httpClient:HttpClient) { }
  
  getTeacherCourses(e):Observable<any>{
    return this.httpClient.post(this.getTeacherCoursesUrl, e, { 'headers': this.header });
  }
  addNotes(e):Observable<any>{
    return this.httpClient.post(this.getTeacherNotesStoreUrl,e,{'headers':this.header1, reportProgress: true,
    observe: 'events'})
  }
  getNotes(e):Observable<any>{
    return this.httpClient.post(this.getNotesUrl,e,{'headers':this.header})
  }
  deleteOneNote(e):Observable<any>{
    return this.httpClient.post(this.getOneDailyNotesDeleteUrl,e,{'headers':this.header})
  }
  deleteOneCompleteNoteFromDailyNotes(e):Observable<any>{
    return this.httpClient.post(this.getOneCompleteNotesDeleteUrl,e,{'headers':this.header})
  }
  deleteOneCompleteNoteFromSemester(e):Observable<any>{
    return this.httpClient.post(this.getCompleteNoteDeleteUrlFormSemester,e,{'headers':this.header})
  }
  deleteOneCompleteNoteFromSemesterNotes(e):Observable<any>{
    return this.httpClient.post(this.getOneCompleteNotesDeleteFromSemesterUrl,e,{'headers':this.header})
  }
  updateNotes(e):Observable<any>{
    return this.httpClient.post(this.getNoteUpdateUrl,e,{'headers':this.header1, reportProgress: true,
    observe: 'events'})
  }
  updateSemesterNotes(e):Observable<any>{
    return this.httpClient.post(this.getSemesterNoteUpdateUrl,e,{'headers':this.header1, reportProgress: true,
    observe: 'events'})
  }
  getAllNotes(e):Observable<any>{
    return this.httpClient.post(this.getAllNotesUrl,e,{'headers':this.header})
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
  getAllSemesterNotes(e):Observable<any>{
    const params=new HttpParams({
      fromObject:{
        course:e.course,
        email:e.email
      }
    })
    return this.httpClient.get(this.getAllSemesterNotesUrl,{headers:this.header,params:params})
  }
  addNotesToDailyNotes(e):Observable<any>{
    const params=new HttpParams({
      fromObject:{
        id:e
      }
    })
    return this.httpClient.get(this.getAddNotesToDailyNotesUrl,{headers:this.header,params:params})
  }
  updateTeacher(e):Observable<any>{
    return this.httpClient.post(this.getUpdateTeacherUrl,e,{'headers':this.header})
  }
}
