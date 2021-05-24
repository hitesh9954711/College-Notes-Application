import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminGuardGuard } from '../admin-guard.guard';
import { AdminModule } from '../admin/admin.module';
import { ApiService } from '../api.service';
import { StudentGuardGuard } from '../student-guard.guard';
import { TeacherGuardGuard } from '../teacher-guard.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  spinner=false;
  formCheck=true;
  loginForm:FormGroup;
  condition:boolean;
  baseUrl=environment.baseUrl;
  baseUrl1=this.baseUrl+"/doLogin";
  message:string;
  class:string;
  object:any;
  obj:{
    userEmail:string,
    userPassword:string
  }
  constructor(public formBuilder:FormBuilder,public httpService:ApiService,public httpClient:HttpClient,
    public adminGuard:AdminGuardGuard,public studentGuard:StudentGuardGuard,public teacherGuard:TeacherGuardGuard,
    public router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      userEmail:['',[Validators.required,Validators.email]],
      userPassword:['',[Validators.required]]
    })
  }

  onSubmit(){
    this.spinner=true
    this.formCheck=false;

    this.obj={
      userEmail:this.loginForm.get('userEmail').value,
      userPassword:this.loginForm.get('userPassword').value
    }
    this.httpService.postData(this.obj).subscribe({
      next:data=>{
        console.log(data)
        this.spinner=false;
        this.formCheck=true;
        this.object=data
        sessionStorage.setItem("name",this.object.name);
        sessionStorage.setItem("token",this.object.token);
        sessionStorage.setItem("role",this.object.role);
        sessionStorage.setItem("email",this.object.email)
        if(this.object.role=='ROLE_ADMIN'){
          this.adminGuard.setCheck(true)
          this.router.navigateByUrl("admin")
        }
        else if(this.object.role=='ROLE_TEACHER'){
          this.teacherGuard.setCheck(true)
          this.router.navigateByUrl("teacher")
        }
        else if(this.object.role=='ROLE_STUDENT'){
          sessionStorage.setItem("course",this.object.courses)
          this.studentGuard.setCheck(true)
          this.router.navigateByUrl("student")
        }
        
      },
      error:error=>{
        console.log(error)
         this.spinner=false;
         this.formCheck=true;
         this.message="Your Credentials is not correct"
         this.class="alert-danger"
      }
    })
    
  }

}
