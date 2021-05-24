import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewallcourseComponent } from '../viewallcourse/viewallcourse.component';
@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrls: ['./coursedetails.component.css']
})
export class CoursedetailsComponent implements OnInit {
  parmQuery:string;
  subjectDetailList:any=[ ];
  subjectDetailList1: any = [ ];
  courseList:any=[ ];
  check:boolean;
  message:string;
  object:{
    id:number,
    index:number
  }
  object1:{
    course:string
  }
  deleteSemester1:{
    id:number;
  }
  updateSemester:{
    id:number,
    subject:string
  }
  class:string
  progress:boolean
  constructor(public activatedRoute:ActivatedRoute,public adminService:AdminServiceService,public dialog: MatDialog) {
    this.activatedRoute.params.subscribe(data=>{
      this.parmQuery=data.course;
    });
    this.sendRequests()
   }
  ngOnInit(): void {
   
  }
    openDialog(id,i) {
    console.log(id)
    console.log(i)
    let ref=this.dialog.open(DialogComponent,{data:{name:'deleteSubject'}});
    ref.afterClosed().subscribe(data=>{
      if(data=='true'){
          this.deleteSubject(id,i)
      }
      else{
        this.class="alert-success"
        this.message="Subject is not deleted"
        this.setTimeMethod(8000)
      }
    })
  }
  openDialogForSemester(id){
    console.log(id)
    let ref=this.dialog.open(DialogComponent,{data:{name:'deleteSemester'}});
    ref.afterClosed().subscribe(data=>{
      if(data=='true'){
        this.deleteSemester(id)
    }
    else{
      this.class="alert-success"
      this.message="Semester is not deleted"
      this.setTimeMethod(8000)
    }
    })
  }
  openDialogForUpdate(id){
    console.log(id)
    let ref=this.dialog.open(DialogComponent,{data:{name:'updateSemester'}});
    ref.afterClosed().subscribe(data=>{
      console.log(data)
      if(data=="false" || data==undefined){
        this.class="alert-danger"
        this.message="Semester is not  Updated"
        this.setTimeMethod(8000)
        this.sendRequests();
      }
      else{
        this.DoUpdateSemester(id,data)
      }
      
    })
  }
  DoUpdateSemester(id,subject){
    this.progress=true;
    this.updateSemester={
      id:id,
      subject:subject
    }
    this.adminService.updateSemester(this.updateSemester).subscribe({
      next:data=>{
        this.class="alert-success"
        this.message="Semester is Updated Successfully"
        this.setTimeMethod(8000)
        this.sendRequests();
      },
      error:error=>{
        this.class="alert-danger"
        this.message="Something Went Wrong"
        this.setTimeMethod(8000)
      }
    })
  }
  deleteSemester(id){
    this.progress=true
    this.deleteSemester1={
      id:id
    }
    this.adminService.deleteSemester(this.deleteSemester1).subscribe({
      next:data=>{
        this.class="alert-success"
        this.message="Semester is deleted Successfully"
        this.setTimeMethod(8000)
        this.sendRequests();
      },
      error:error=>{
        this.class="alert-danger"
        this.message="Something Went Wrong"
        this.setTimeMethod(8000)
      }
    })
  }
  deleteSubject(id,index){
    this.progress=true
    this.object={
      id:id,
      index:index
    }
    this.adminService.deleteSubject(this.object).subscribe({
      next:data=>{
        this.class="alert-success"
        this.message="Subject is deleted Successfully"
        this.setTimeMethod(8000)
        this.sendRequests();
      },
      error:error=>{
        this.class="alert-danger"
        this.message="Something Went Wrong"
        this.setTimeMethod(8000)
      }
    })
  }
  sendRequests(){
    this.progress=true
    this.object1={
      course:this.parmQuery
    }
    this.adminService.getCourseDetails(this.object1).subscribe({
      next:data=>{
        this.progress=false
        this.courseList=data
        console.log(this.courseList)
      },
      error:error=>{
        this.class="alert-danger"
        this.message="Something Went Wrong"
        this.setTimeMethod(80000)
        console.log(error)
      }
    })
    this.adminService.getSubjectDetail(this.object1).subscribe({
      next:data=>{
        this.subjectDetailList=data
        if(this.subjectDetailList.length==0){
          this.class="alert-danger"
          this.message="No details found"
          this.setTimeMethod(80000)
        }
        console.log(this.subjectDetailList)
        this.check=true
      },
      error:error=>{
        console.log(error)
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
}
