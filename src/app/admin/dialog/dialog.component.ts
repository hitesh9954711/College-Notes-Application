import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LogoutService } from 'src/app/logout.service';
import { StudentapiserviceService } from 'src/app/student/studentapiservice.service';
import { TeacherApiServiceService } from 'src/app/teacher/teacher-api-service.service';
import { AdminServiceService } from '../admin-service.service';
import { Model } from '../Model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent extends Model implements OnInit {
  form:FormGroup
  dataFrom:any;
  subject:string;
  name:string;
  email:string;
  check:string;
  object:{
    name:string,
    email:string,
    password:string
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private formBuilder:FormBuilder,private service:AdminServiceService,private teacherService:TeacherApiServiceService,private studentService:StudentapiserviceService) {
    super();
  }

  ngOnInit(): void {
      this.name=sessionStorage.getItem("name");
      this.email=sessionStorage.getItem("email")
      this.form=this.formBuilder.group({
        name:[this.name,Validators.required],
        email:[{value:this.email,disabled: true},[Validators.required,Validators.email,]],
        password:['',Validators.required]
      })
  }
  onSubmit1(){
    this.progress=true;
    if(this.form.valid==true){
      this.object={
        name:this.form.get('name').value,
        email:this.form.get('email').value,
        password:this.form.get('password').value
      }
      this.teacherService.updateTeacher(this.object).subscribe({
        next:data=>{
          this.setProperties(false,"Profile is updated successfully","alert-success")
          this.setTimeMethod(15000);
        },
        error:error=>{
          this.setProperties(false,"Something went wrong","alert-danger")
          this.setTimeMethod(15000);
        }
      })
    }
    else{
      this.setProperties(false,"Please Fill The Form","alert-warning")
      this.setTimeMethod(15000);
    }
  }
  onSubmit(){
    this.progress=true;
    if(this.form.valid==true){
      this.object={
        name:this.form.get('name').value,
        email:this.form.get('email').value,
        password:this.form.get('password').value
      }
      this.service.adminProfileUpdate(this.object).subscribe({
        next:data=>{
          this.setProperties(false,"Profile is updated successfully","alert-success")
          this.setTimeMethod(15000);
        },
        error:error=>{
          this.setProperties(false,"Something went wrong","alert-danger")
          this.setTimeMethod(15000);
        }
      })
    }
    else{
      this.setProperties(false,"Please Fill The Form","alert-warning")
      this.setTimeMethod(15000);
    }
  }
  onSubmit2(){
    this.progress=true;
    if(this.form.valid==true){
      this.object={
        name:this.form.get('name').value,
        email:this.form.get('email').value,
        password:this.form.get('password').value
      }
      this.studentService.getStudentUpdate(this.object).subscribe({
        next:data=>{
          this.setProperties(false,"Profile is updated successfully","alert-success")
          this.setTimeMethod(15000);
        },
        error:error=>{
          this.setProperties(false,"Something went wrong","alert-danger")
          this.setTimeMethod(15000);
        }
      })
    }
    else{
      this.setProperties(false,"Please Fill The Form","alert-warning")
      this.setTimeMethod(15000);
    }
  }
}
