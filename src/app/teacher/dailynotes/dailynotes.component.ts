import { FocusMonitor } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Model } from 'src/app/admin/Model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TeacherApiServiceService } from '../teacher-api-service.service';
import { TeacherDialogComponent } from '../teacher-dialog/teacher-dialog.component';
import {saveAs} from 'file-saver';
import { Model1 } from '../Model1';
import { VideoComponentComponent } from 'src/app/video-component/video-component.component';
@Component({
  selector: 'app-dailynotes',
  templateUrl: './dailynotes.component.html',
  styleUrls: ['./dailynotes.component.css']
})
export class DailynotesComponent extends Model1 implements OnInit {
  course:string;
   datepipe= new DatePipe('en-US');
   notes:any=[];
   fileStatus = { status: '', requestType: '', percent: 0 };
   filenames: string[] = [];
   searchNotes:any=[];
   obj:{
     date:string,
     course:string,
     email:string
   }
   obj1:{
     id:number,
     index:number,
     check:boolean
   }
   obj2:{
     id:number
   }
   obj3:{
     email:string,
     course:string,
   }
   obj4:{
     name:string,
     check:boolean
   }
  constructor(public activatedRoute:ActivatedRoute,private apiService:TeacherApiServiceService,private dialog:MatDialog) {
    super();
  }
  search(topic){
    this.searchNotes=this.notes.filter((o)=>{
      if(o.topic==topic){
        return true
      }
      else{
        return false
      }
    })
  }
  openDialogForVideo(name,check){
    let ref=this.dialog.open(VideoComponentComponent,{data:{name:'video',filename:name,check:check}})
    ref.afterClosed().subscribe(data=>{
      console.log(data)
    })
  }
  openDialogForDeleteOneNote(id,index,check){
    let ref=this.dialog.open(DeleteConfirmationDialogComponent,{data:{name:'deleteOneNotes'}});
    ref.afterClosed().subscribe(data=>{
      console.log(data)
      if(data=='true'){
        this.deleteNotes(id,index,check);
      }
      else{
        this.setProperties(false,"Notes is not deleted","alert-warning")
        this.setTimeMethod(10000)
      }
    })
  }
  openDialogToUpdate(id){
    let ref=this.dialog.open(TeacherDialogComponent,{data:{name:'updateNotes',id:id}});
    ref.afterClosed().subscribe(data=>{
      if(data=='false' || data==undefined){
        this.getNotes()
      }
      else{
        this.getNotes()
      }
    })
  }
  openDialogToDeleteCompleteNote(id){
    let ref=this.dialog.open(DeleteConfirmationDialogComponent,{data:{name:'deleteOneCompleteNote'}});
    ref.afterClosed().subscribe(data=>{
      console.log(data)
      if(data=='true'){
        this.deleteOneCompleteNote(id);
      }
      else{
        this.setProperties(false,"Notes are not deleted","alert-warning")
        this.setTimeMethod(10000)
      }
    })
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.course=data.course;
    });
  this.getNotes()
}
getNotes(){
  let latest_Date=this.datepipe.transform(new Date().toISOString(), 'M/dd/yyyy');
  this.obj={
    date:latest_Date,
    course:this.course,
    email:sessionStorage.getItem('email')
  }
  this.apiService.getNotes(this.obj).subscribe({
    next:data=>{
      this.notes=data
      console.log(this.notes)
      if(this.notes.length==0){
        this.progress1=false
        this.setProperties(false,"No Notes Found","alert-warning")
        this.setTimeMethod(10000)
      }
      else{
      this.progress1=false
      }
    },
    error:error=>{
      this.setProperties(false,"Something went wrong","alert-danger")
      this.setTimeMethod(10000)
    }
  })
}
download(name,check){
  this.obj4={
    name:name,
    check:check
  }
  this.apiService.downloadNotes(this.obj4).subscribe(
    event => {
      console.log(event);
      this.resportProgress(event);
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    } 
  )
}
getAllNotes(){
  this.obj3={
    email:sessionStorage.getItem('email'),
    course:this.course
  }
  this.apiService.getAllNotes(this.obj3).subscribe({
    next:data=>{
      this.notes=data
      console.log(this.notes)
      if(this.notes.length==0){
        this.progress1=false
        this.setProperties(false,"No Notes Found","alert-warning")
        this.setTimeMethod(10000)
      }
      else{
      this.progress1=false
      }
    },
    error:error=>{
      this.setProperties(false,"Something went wrong","alert-danger")
      this.setTimeMethod(10000)
    }
  })
}
  onSubmit(form){
    let latest_date =this.datepipe.transform(form.value.date, 'M/dd/yyyy');
    this.progress1=true
    if(form.valid==true){
      this.obj={
        date:latest_date,
        course:this.course,
        email:sessionStorage.getItem('email')
      }
      this.apiService.getNotes(this.obj).subscribe({
        next:data=>{
          this.notes=data
          console.log(this.notes)
          if(this.notes.length==0){
            this.progress1=false
            this.setProperties(false,"No Notes Found","alert-warning")
            this.setTimeMethod(10000)
          }
          else{
          this.progress1=false
          }
        },
        error:error=>{
          this.setProperties(false,"Something went wrong","alert-danger")
          this.setTimeMethod(10000)
        }
      })
    }
    else{
      this.setProperties(false,"Please select the date","alert-warning")
    }
  }
  deleteNotes(id,index,check){
    this.progress1=true;
    this.obj1={
      id:id,
      index:index,
      check:check
    }
    this.apiService.deleteOneNote(this.obj1).subscribe({
      next:data=>{
        this.setProperties(false,"Notes are successfully deleted","alert-success")
        this.setTimeMethod(10000)
        this.getNotes()
      },
      error:error=>{
        this.setProperties(false,"Something went wrong","alert-danger")
        this.setTimeMethod(10000)
      }
    })
  }
  deleteOneCompleteNote(id){
    this.progress1=true;
    this.obj2={
      id:id,
    }
    this.apiService.deleteOneCompleteNoteFromDailyNotes(this.obj2).subscribe({
      next:data=>{
        this.setProperties(false,"Notes are successfully deleted","alert-success")
        this.setTimeMethod(10000)
          this.getNotes()
      },
      error:error=>{
        this.setProperties(false,"Something went wrong","alert-danger")
        this.setTimeMethod(10000)
      }
    })
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
         
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
