import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/admin/admin-service.service';
import { Model } from 'src/app/admin/Model';
import { TeacherApiServiceService } from '../teacher-api-service.service';
import { TeachercourseserviceService } from '../teachercourseservice.service';

@Component({
  selector: 'app-add-daily-notes',
  templateUrl: './add-daily-notes.component.html',
  styleUrls: ['./add-daily-notes.component.css']
})
export class AddDailyNotesComponent extends Model implements OnInit {
  courses:any[];
  coursesDetails:any[];
  subject:any=[ ];
  constructor(private apiService:TeacherApiServiceService,private serviceT:TeachercourseserviceService) {
    super();
  }
  object111={
    course:sessionStorage.getItem("email")
  }
  ngOnInit(): void {

    this.progress=true
    this.apiService.getTeacherCourses(this.object111).subscribe({
      next:data=>{
         this.courses=data.courseFromCourse
         this.coursesDetails=data.courseDetails
         this.serviceT.setCourses(this.courses)
         this.serviceT.setCoursesDetails(this.coursesDetails)
         console.log(this.courses)
         console.log(this.coursesDetails)
         this.progress=false
      },
      error:error=>{
        this.progress=false
        console.log(error)
      }
    })
  }


}
