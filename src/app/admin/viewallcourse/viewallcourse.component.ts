import { Component, Injectable, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Model } from '../Model';
@Component({
  selector: 'app-viewallcourse',
  templateUrl: './viewallcourse.component.html',
  styleUrls: ['./viewallcourse.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ViewallcourseComponent extends Model implements OnInit {
  courseList:any[];
  subjectList:any[];
  constructor(public adminService:AdminServiceService) {
    super();
  }
  ngOnInit(): void {
    this.progress=true
    this.adminService.getCourses().subscribe({
      next:data=>{
        this.progress=false  
        this.courseList=data
        console.log(this.courseList)
      },
      error:error=>{
          this.progress=false
          this.setProperties(false,"No Courses Found","alert-warning")
        
      }
    })
  }
}
