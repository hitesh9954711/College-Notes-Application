import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../admin-service.service';

@Component({
  selector: 'app-add-course-detail',
  templateUrl: './add-course-detail.component.html',
  styleUrls: ['./add-course-detail.component.css']
})
export class AddCourseDetailComponent implements OnInit {
  progress:boolean;
  class:string;
  message:string;
  courseList:any[];
  selectedValue:string;
  formCheck:boolean;
  listOfSemester=[{
    course:"Select the Semester",
    semesters:[""]
  }];
  subject:string[]=["Subject_0","Subject_1","Subject_2","Subject_3","Subject_4","Subject_5","Subject_6","Subject_7","Subject_8","Subject_9"]
  formObject:{
    course:string,
    semester:string,
    subjects:string[]
  }
  sub:string;
  constructor(public adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.progress=true
    this.class='alert-info'
    this.message='Loading....'
    this.adminService.getCourses().subscribe({
      next:data=>{
        this.courseList=data
        this.formCheck=true
        this.progress=false
        this.message=null
        this.class=null
      },
      error:error=>{
        this.progress=true
        this.class='alert-danger'
        this.message='Something Went Wrong'
        this.setTimeMethod(19000)
      }
    })
  }
  onOptionsSelected(e){
    this.listOfSemester=this.courseList.filter((o)=>{
      this.listOfSemester=null
      if(o.course==e){
        return true
      }
      else{
        return false
      }
    })
  }
  setTimeMethod(time){
    setTimeout(abc=>{
      this.progress=false
      this.message=null
      this.class=null
    },time)
  }
  onSubmit(form){
    console.log(form)
      this.formObject={
        course:form.value.course,
        semester:form.value.semester,
        subjects:[form.value.Subject_0,form.value.Subject_1,form.value.Subject_2,form.value.Subject_3,form.value.Subject_4,
        form.value.Subject_5,form.value.Subject_6,form.value.Subject_7,form.value.Subject_8,form.value.Subject_9]
      }
      if(form.valid){
        this.progress=true
        this.adminService.postCourseDetails(this.formObject).subscribe({
          next:data=>{
              this.progress=false;
              this.message="Course Details is Saved Successfully"
              this.class="alert-success"
              this.setTimeMethod(12000);
          },
          error:error=>{
            this.progress=false;
            this.message="Course Details Already Exits or Something went wrong"
            this.class="alert-danger"
            this.setTimeMethod(12000)
            console.log(error)
          }
        })
      }
      else{
        this.class='alert-danger'
        this.message='Three subject is must to submit the form'
        this.setTimeMethod(6000)
      }
  }
}
