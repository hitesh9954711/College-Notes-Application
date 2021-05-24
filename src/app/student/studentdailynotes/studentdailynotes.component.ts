import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Model } from 'src/app/admin/Model';
import { VideoComponentComponent } from 'src/app/video-component/video-component.component';
import { StudentapiserviceService } from '../studentapiservice.service';
import {saveAs} from 'file-saver';
import { Model1 } from 'src/app/teacher/Model1';
@Component({
  selector: 'app-studentdailynotes',
  templateUrl: './studentdailynotes.component.html',
  styleUrls: ['./studentdailynotes.component.css']
})
export class StudentdailynotesComponent extends Model1 implements OnInit {
  allNotesList:any=[];
  todaynotes:any=[];
  fileStatus = { status: '', requestType: '', percent: 0 };
   filenames: string[] = [];
  obj:{
    course:string
  }
  obj4:{
    name:string,
    check:boolean
  }
  datepipe= new DatePipe('en-US');
  constructor(private apiService:StudentapiserviceService,public dialog:MatDialog) { super()}

  ngOnInit(): void {
    this.progress1=true
    this.obj={
      course:sessionStorage.getItem('course')
    }
    this.apiService.getStudentDailyNotes(this.obj).subscribe({
      next:data=>{
        this.allNotesList=data
        this.todayNotesM()
        console.log(this.allNotesList)
        if(this.allNotesList.length==0){
          this.setProperties(false,"No notes not found","alert-warning")
          this.setTimeMethod(10000)
        }
        else{
          this.progress1=false
        }
      },
      error:error=>{
        this.setProperties(false,"Something went wrong","alert-warning")
        this.setTimeMethod(10000)
      }
    })
  }
  openDialogForVideo(name,check){
    let ref=this.dialog.open(VideoComponentComponent,{data:{name:'video',filename:name,check:check}})
    ref.afterClosed().subscribe(data=>{
      console.log(data)
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
  todayNotesM(){
    let latest_Date=this.datepipe.transform(new Date().toISOString(), 'M/dd/yyyy');
    this.todaynotes=this.allNotesList.filter((o)=>{
      if(o.date==latest_Date){
        return true
      }
      else{
        return false
      }
    })
    if(this.todaynotes.length==0){
      this.setProperties(false,"Notes are not found","alert-warning")
      this.setTimeMethod(10000);
    }
  
  }
  onSubmit(form){
    let latest_Date=this.datepipe.transform(form.value.date, 'M/dd/yyyy');
    this.todaynotes=this.allNotesList.filter((o)=>{
      if(o.date==latest_Date){
        return true
      }
      else{
        return false
      }
    })
    if(this.todaynotes.length==0){
      this.setProperties(false,"Notes are not found","alert-warning")
      this.setTimeMethod(10000);
    }
  }
  search(value){
    this.todaynotes=this.allNotesList.filter((o)=>{
      if(o.topic==value){
        return true
      }
      else{
        return false
      }
    })
    if(this.todaynotes.length==0){
      this.setProperties(false,"Notes are not found","alert-warning")
      this.setTimeMethod(10000);
    }
  }
  getAllNotes(){
    this.todaynotes=this.allNotesList
    if(this.todaynotes.length==0){
      this.setProperties(false,"Notes are not found","alert-warning")
      this.setTimeMethod(10000);
    }
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
