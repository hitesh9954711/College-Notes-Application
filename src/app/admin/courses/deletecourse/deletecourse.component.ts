import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from '../../admin-service.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { Model } from '../../Model';

@Component({
  selector: 'app-deletecourse',
  templateUrl: './deletecourse.component.html',
  styleUrls: ['./deletecourse.component.css']
})
export class DeletecourseComponent extends Model implements OnInit {
  courseList:any[]
  deleteCourse:FormGroup
  object:{
    course:string
  }
  constructor(public formBuilder:FormBuilder,public service:AdminServiceService,public matDialog:MatDialog) {
    super();
  }
  openDialog() {
    let ref=this.matDialog.open(DialogComponent,{data:{name:'deleteCourse'}});
    ref.afterClosed().subscribe(data=>{
      console.log(data)
      if(data=='true'){
        this.sendRequest();
      }
      else if(data=='false'){
       this.setProperties(false,"Course is not deleted","alert-success")
       this.setTimeMethod(10000)
      }
      else{
        this.setProperties(false,"Course is not deleted","alert-success")
        this.setTimeMethod(10000)
      }
    })
  }
  ngOnInit(): void {
    this.progress=true
  this.service.getCourses().subscribe({
    next:data=>{
      this.courseList=data
      if(this.courseList.length==0){
        this.setProperties(false,"No Courses Found","alert-danger")
        this.setTimeMethod(10000);
      }
      else{
        this.progress=false
      }
    },
    error:error=>{
      this.setProperties(false,"Something Went Wrong","alert-danger")
    }
  })
  this.deleteCourse=this.formBuilder.group({
    course:['',Validators.required]
  })
  }
  sendRequest(){
    console.log(this.deleteCourse)
    this.progress=true
    if(this.deleteCourse.valid==true){
      this.object={
        course:this.deleteCourse.get('course').value
      }
      this.service.deleteCourse(this.object).subscribe({
        next:data=>{
          this.setProperties(false,"Course is deleted successfully","alert-success")
          this.setTimeMethod(10000)
        },
        error:error=>{
          this.setProperties(false,"Something Went Wrong","alert-danger")
          this.setTimeMethod(10000)
        }
      })
    }
    else{
      this.setProperties(false,"Please select the course","alert-warning")
      this.setTimeMethod(10000)
    }
  }
  onSubmit(){
    this.openDialog()
  }

}
