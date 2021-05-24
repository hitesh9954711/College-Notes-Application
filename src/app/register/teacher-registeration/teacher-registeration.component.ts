import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-teacher-registeration',
  templateUrl: './teacher-registeration.component.html',
  styleUrls: ['./teacher-registeration.component.css']
})
export class TeacherRegisterationComponent implements OnInit {
  courseList:any[];
  class:string="alert-warning";
  message:string="Loading.....";
  check:boolean;
  teacherRegistrationForm:FormGroup;
  object:{
    name:string,
    email:string,
    courses:string[]
  }
  constructor(private apiservice:ApiService,public formBuilder:FormBuilder) {
    this.teacherRegistrationForm=this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      courses:['',[Validators.required]],
    })
   }

  ngOnInit(): void {
    this.apiservice.getCourses().subscribe({
      next:data=>{
        if(data.length==0){
          this.class="alert-danger"
          this.message="Courses Not Found"
          this.setTimeMethod(20000)
        }
        else{
          this.courseList=data
          this.class=null
          this.message=null
        }
      },
      error:error=>{
        this.class="alert-danger"
        this.message="Something went wrong !! Or You may Have already registered"
        this.setTimeMethod(20000)
      }
    })
  }
  doSubmit(){
    if(this.teacherRegistrationForm.valid==true){
      this.object={
        name:this.teacherRegistrationForm.get("name").value,
        email:this.teacherRegistrationForm.get("email").value,
        courses:this.teacherRegistrationForm.get("courses").value
      }
      this.apiservice.saveTeacher(this.object).subscribe({
        next:data=>{
          this.class="alert-success"
          this.message="Your Request is send successfully.After verification your password is send by admin"
          this.setTimeMethod(20000)
        },
        error:error=>{
          console.log(error)
          this.class="alert-danger"
          this.message="You request is already saved."
          this.setTimeMethod(20000)
        }
      })
    }
    else{
      this.class="alert-danger"
      this.message="Please Fill All The details"
      this.setTimeMethod(20000)
    }
  }
  setTimeMethod(time){
    setTimeout(abc=>{
      this.message=null
      this.class=null
    },time)}

}
