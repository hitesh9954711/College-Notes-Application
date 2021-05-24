import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from '../admin-service.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Model } from '../Model';

@Component({
  selector: 'app-teacher-requests',
  templateUrl: './teacher-requests.component.html',
  styleUrls: ['./teacher-requests.component.css']
})
export class TeacherRequestsComponent extends Model implements OnInit {
  teacherRequestList:any[];
  object:{
    course:string
  }
  constructor(public apiServie:AdminServiceService,public matDialog:MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getRequestsList()
  }
  openDialog(email) {
    let ref=this.matDialog.open(DialogComponent,{data:{name:'action'}});
    ref.afterClosed().subscribe(data=>{
      console.log(data)
      if(data=='true'){
        this.acceptTeacherReq(email)
      
      }
      else if(data=='false'){
        this.deleteTeacherReq(email)
      }
      else{

      }
    })
  }
  deleteTeacherReq(email){
    console.log("delete worked")
    this.object={
      course:email
    }
    this.setProperties(true,"Please Wait","alert-primary")
    this.apiServie.deleteTeacherRequest(this.object).subscribe({
      next:data=>{
        this.setProperties(false,"TeacherRequest is Deleted","alert-success")
        this.setTimeMethod(8000)
        this.getRequestsList()
      },
      error:error=>{
        this.setProperties(false,"Something went wrong email is not send to "+email,"alert-danger")
        this.setTimeMethod(8000)
      }
    })
  }

  acceptTeacherReq(e){
    this.object={
      course:e
    }
    this.setProperties(true,"Password Sending To Teacher","alert-warn")
    this.apiServie.acceptTeacherRequest(this.object).subscribe({
      next:data=>{
        this.setProperties(false,"Password is send to "+e,"alert-success")
        this.setTimeMethod(8000)
        this.getRequestsList()
      },
      error:error=>{
        this.setProperties(false,"Something went wrong","alert-danger")
        this.setTimeMethod(18000)
      }
    })
  }
  getRequestsList(){
    this.setProperties(true,"Loading.....","alert-warning")
    this.apiServie.getTeachersRequests().subscribe({
      next:data=>{
        console.log(data)
        this.teacherRequestList=data
        if(this.teacherRequestList.length==0){
          this.setProperties(false,"No Requests Fount","alert-warning")
          this.setTimeMethod(10000)
        }
        else{
          this.unsetProperties();
        }
      },
      error:error=>{
        this.setProperties(false,"Sorry Something Went Wrong","alert-danger")
        this.setTimeMethod(20000)
      }
    })
  }

}
