import { Injectable } from '@angular/core';
import { TeacherApiServiceService } from './teacher-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class TeachercourseserviceService {
  courses:any[];
  coursesDetails:any[];
  anotherCourseDetailsList:any=[];
  constructor() { }

  setCoursesDetails(coursesDetails){
    this.coursesDetails=coursesDetails
  }
  setCourses(courses){
    this.courses=courses
  }
  getCoursesDetails(){
    return this.coursesDetails
  }
  getCourses(){
    return this.courses
  }
  getOneCourses(e){
    return this.courses.filter((o)=>{
      if(o.course==e){
        return true
      }
      else{
        return false
      }
    })
  }
  getOneCourseDetails(e){
    this.anotherCourseDetailsList=[];
      for(let arrayList of this.coursesDetails){
          for(let objects of arrayList){
            if(objects.course==e){
              this.anotherCourseDetailsList.push(objects)
            }
          }
      }
      console.log(this.anotherCourseDetailsList)
      return this.anotherCourseDetailsList
  }
}
