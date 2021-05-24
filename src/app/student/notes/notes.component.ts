import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Model1 } from 'src/app/teacher/Model1';
import { VideoComponentComponent } from 'src/app/video-component/video-component.component';
import { StudentapiserviceService } from '../studentapiservice.service';
import {saveAs} from 'file-saver';
import { DialogComponent } from 'src/app/admin/dialog/dialog.component';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent extends Model1 implements OnInit {
  allnoteslist:any=[];
  searchnotes:any=[];
  courseList:any=[];
  subectList:any=[];
  anotherSubjectsList:any[];
  obj:{
    course:string
  }
  obj4:{
    name:string,
    check:boolean
  }
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];
  constructor(private api:StudentapiserviceService,public dialog:MatDialog) {
    super();
    
  }

  ngOnInit(): void {
    
    this.progress1=true
    this.obj={
      course:sessionStorage.getItem('course')
    }
    
    this.api.getStudentSemesterNotes(this.obj).subscribe({
      next:data=>{
        this.allnoteslist=data
        this.searchnotes=this.allnoteslist
        console.log(this.allnoteslist)
        if(this.allnoteslist.length==0){
          this.setProperties(false,"Notes are not found","alert-warning")
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
    this.api.getStudentCourse(this.obj).subscribe({
      next:data=>{
        this.courseList.push(data)
        console.log(this.courseList)
      },
      error:error=>{

      }
    })
    this.api.getStudentDetail(this.obj).subscribe({
      next:data=>{
        this.subectList=data
        
        console.log(this.subectList)
      },
      error:error=>{

      }
    })
    
  }
  onSubmit(form){
    this.searchnotes=this.allnoteslist.filter((o)=>{
      if(o.semester==form.value.semester && o.subject==form.value.subject){
        return true;
      }
      else{
        return false
      }
    })
    if(this.anotherSubjectsList.length==0){
      this.setProperties(false,"No Notes are found","alert-warning")
      this.setTimeMethod(10000)
    }
  }
  showSubjects(value){
    
    this.anotherSubjectsList=this.subectList.filter((o)=>{
      if(o.semester==value){
        return true
      }
      else{
        return false
      }
    })
    if(this.anotherSubjectsList.length==0){
      this.setProperties(false,"No Subjects are found","alert-warning")
      this.setTimeMethod(10000)
    }
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
    this.api.downloadNotes(this.obj4).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      } 
    )
  }
search(v){
  this.searchnotes=this.allnoteslist.filter((o)=>{
    if(o.topic==v){
      return true
    }
    else{
      return false
    }
  })
}
openDialog() {
  let ref=this.dialog.open(DialogComponent,{data:{name:'studentProfile'}});
  ref.afterClosed().subscribe(data=>{
  })
}
getAllNotes(){
this.searchnotes=this.allnoteslist
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


