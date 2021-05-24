import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../admin-service.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourse:FormGroup
  class:string
  message:string
  progress:boolean
  object:{
    course:string,
    semesters:string[]
  }
  constructor(public formBuilder:FormBuilder,public myservice:AdminServiceService) { }

  ngOnInit(): void {
    this.addCourse=this.formBuilder.group({
      course:['',[Validators.required]],
      semesters:['',[Validators.required]]
    })
  }
  onSubmit(){
    if(this.addCourse.valid){
      this.object={
        course:this.addCourse.get('course').value,
        semesters:this.addCourse.get('semesters').value
      }
      this.progress=true
      this.myservice.postData(this.object).subscribe({
        next:data=>{
          console.log(data)
          this.message="Course is added successfully."
          this.class='alert-primary'
          this.progress=false
          setTimeout(abc=>{
            this.class=null
          },9000)
        },
        error:error=>{
          console.log(error)
            this.message="Course is already exits."
            this.class='alert-danger'
            this.progress=false
            setTimeout(abc=>{
              this.class=null
            },9000)
        }
      })
    }
    else{
      this.message="Please fill the form."
      this.class='alert-danger'
      this.progress=false
      setTimeout(abc=>{
        this.class=null
      },9000)
    }
  }

}
