import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
 baseUrl=environment.adminBaseUrl;
 courseUrl=this.baseUrl+'/addCourse'
 getCourseUrl=this.baseUrl+'/courseDetails'
 courseDetailUrl=this.baseUrl+"/addCourseDetails"
 getCoursesDetailUrl=this.baseUrl+"/getCoursesDetails"
 getSubjectsDetailUrl=this.baseUrl+"/getSubjectsDetails"
 getCourseDetailUrl=this.baseUrl+"/getCourseDetails"
 getSubjectDetailUrl=this.baseUrl+"/getSubjectDetails"
 getDeleteSubjectUrl=this.baseUrl+"/deleteSubject"
 getDeleteSemesterUrl=this.baseUrl+"/deleteSemester"
 getUpdateSemsterUrl=this.baseUrl+"/updateSemester"
 getTeacherRequestsUrl=this.baseUrl+"/getTeachersRequests"
 getTeacherRequestAcceptUrl=this.baseUrl+"/acceptTeacherRequest"
 getTeacherRequestDeleteUrl=this.baseUrl+"/deleteTeacherRequest"
 getTeacherListUrl=this.baseUrl+"/getTeacherList"
 getAdminListUrl=this.baseUrl+"/getAdminList"
 getAddAdminUrl=this.baseUrl+"/addAdmin"
 getDeleteAdminUrl=this.baseUrl+"/deleteAdmin"
 getDeleteTeacherUrl=this.baseUrl+"/deleteTeacher"
 getDeleteCourseUrl=this.baseUrl+"/deleteCourse"
 getAdminProfileUpdateUrl=this.baseUrl+"/adminProfileUpdate"
header= new HttpHeaders().set('Access-Control-Allow-Origin','*')
.set('Authorization','Bearer '+sessionStorage.getItem('token'))
.set('Content-Type','application/json')
.set('Access-Control-Allow-Origin','*')
  constructor(public httpService:HttpClient) { }

  postData(e):Observable<any>{
    return this.httpService.post(this.courseUrl,  e,{ 'headers': this.header })
  }
  getCourses():Observable<any>{
    return this.httpService.get(this.getCourseUrl,{  'headers':this.header})
  }
  postCourseDetails(e):Observable<any>{
    return this.httpService.post(this.courseDetailUrl,e,{'headers':this.header})
  }
  getCoursesDetails():Observable<any>{
    return this.httpService.get(this.getCoursesDetailUrl,{'headers':this.header})
  }
  getSubjectsDetails():Observable<any>{
    return this.httpService.get(this.getSubjectsDetailUrl,{'headers':this.header})
  }
  deleteSubject(e):Observable<any>{
    return this.httpService.post(this.getDeleteSubjectUrl,e,{'headers':this.header})
  }
  getCourseDetails(e):Observable<any>{
    return this.httpService.post(this.getCourseDetailUrl,e,{'headers':this.header})
  }
  getSubjectDetail(e):Observable<any>{
    return this.httpService.post(this.getSubjectDetailUrl,e,{'headers':this.header})
  }
  deleteSemester(e):Observable<any>{
    return this.httpService.post(this.getDeleteSemesterUrl,e,{'headers':this.header})
  }
  updateSemester(e):Observable<any>{
    return this.httpService.post(this.getUpdateSemsterUrl,e,{'headers':this.header});
  }
  getTeachersRequests():Observable<any>{
    return this.httpService.get(this.getTeacherRequestsUrl,{'headers':this.header})
  }
  acceptTeacherRequest(e):Observable<any>{
    return this.httpService.post(this.getTeacherRequestAcceptUrl,e,{'headers':this.header})
  }
  deleteTeacherRequest(e):Observable<any>{
    return this.httpService.post(this.getTeacherRequestDeleteUrl,e,{'headers':this.header})
  }
  getTeachers():Observable<any>{
    return this.httpService.get(this.getTeacherListUrl,{'headers':this.header})
  }
  getAdminList():Observable<any>{
    return this.httpService.get(this.getAdminListUrl,{'headers':this.header})
  }
  addAdmin(e):Observable<any>{
    return this.httpService.post(this.getAddAdminUrl,e,{'headers':this.header})
  }
  deleteAdmin(e):Observable<any>{
    return this.httpService.post(this.getDeleteAdminUrl,e,{'headers':this.header})
  }
  deleteTeacher(e):Observable<any>{
    return this.httpService.post(this.getDeleteTeacherUrl,e,{'headers':this.header})
  }
  deleteCourse(e):Observable<any>{
    return this.httpService.post(this.getDeleteCourseUrl,e,{'headers':this.header})
  }
  adminProfileUpdate(e):Observable<any>{
    return this.httpService.post(this.getAdminProfileUpdateUrl,e,{'headers':this.header})
  }
}
