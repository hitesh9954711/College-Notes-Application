import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Model } from 'src/app/admin/Model';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-registeration',
  templateUrl: './student-registeration.component.html',
  styleUrls: ['./student-registeration.component.css']
})
export class StudentRegisterationComponent extends Model implements OnInit {
  courseList:any[];
  class="alert-warning";
  message="Loading.....";
  studentRegistrationForm:FormGroup;
  object:{
    name:string,
    email:string,
    password:string,
    courses:string
  }
  constructor(private apiservice:ApiService,private formBuilder:FormBuilder) {
    super();
    this.studentRegistrationForm=this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
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
    console.log(this.studentRegistrationForm)
    if(this.studentRegistrationForm.valid==true){
      this.object={
        name:this.studentRegistrationForm.get("name").value,
        email:this.studentRegistrationForm.get("email").value,
        password:this.studentRegistrationForm.get("password").value,
        courses:this.studentRegistrationForm.get("courses").value
      }
      this.apiservice.saveStudent(this.object).subscribe({
        next:data=>{
          this.class="alert-success"
          this.message="You have successfully registered"
          this.setTimeMethod(20000)
        },
        error:error=>{
          console.log(error)
          this.class="alert-danger"
          this.message="Something went wrong or you may have already registered"
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

}
