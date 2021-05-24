import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CoursesComponent } from 'src/app/admin/courses/courses.component';
import { Model } from 'src/app/admin/Model';
import { VideoComponentComponent } from 'src/app/video-component/video-component.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TeacherApiServiceService } from '../teacher-api-service.service';
import { TeacherDialogComponent } from '../teacher-dialog/teacher-dialog.component';
import { TeachercourseserviceService } from '../teachercourseservice.service';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-semesternotes',
  templateUrl: './semesternotes.component.html',
  styleUrls: ['./semesternotes.component.css']
})
export class SemesternotesComponent extends Model implements OnInit {
  course:string;
  courseList:any=[];
  subjects:any=[];
  anotherSubjectsList:any=[ ]
  AllNotes:any=[];
  searchNotes:any=[];
  fileStatus = { status: '', requestType: '', percent: 0 };
   filenames: string[] = [];
  constructor(public dialog:MatDialog,public activatedRoute:ActivatedRoute,public apiservice:TeacherApiServiceService,public courseService:TeachercourseserviceService) {
    super();
  }
  obj4:{
    name:string,
    check:boolean
  }
  obj:{
    course:string
    email:string
  }
  obj1:{
    id:number,
    index:number,
    check:boolean
  }
  obj2:{
    id:number,
    index:number
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.course=data.course;
      console.log(this.course)
    });
    this.anotherSubjectsList.push({
      course:"BCA",
      id:111,
      semester:'sdf',
      subjects:['Select the subject']
    })
    
    this.getSemesterNotes();
    this.getAllNotes();
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
    let ref=this.dialog.open(TeacherDialogComponent,{data:{name:'updateSemesterNotes',id:id}});
    ref.afterClosed().subscribe(data=>{
      if(data=='false' || data==undefined){
        this.getAllNotes();
      }
      else{
        
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
  deleteOneCompleteNote(id){
    this.progress=true
    this.obj2={
      id:id,
      index:0
    }
    this.apiservice.deleteOneCompleteNoteFromSemester(this.obj2).subscribe({
      next:data=>{
        this.setProperties(false,"Notes are deleted","alert-success")
        this.getAllNotes();
      },
      error:error=>{
        this.setProperties(false,"Notes are not deleted","alert-danger")
      }
    })
  }
  AddToDailyNotes(id){
    this.apiservice.addNotesToDailyNotes(id).subscribe({
      next:data=>{
        this.setProperties(false,"Notes are added successfully","alert-success")
        this.setTimeMethod(10000);
      },
      error:error=>{
        this.setProperties(false,"Something went wrong","alert-danger")
        this.setTimeMethod(10000);
      }
    })
  }
  deleteNotes(id,index,check){
      this.progress=true
      this.obj1={
        id:id,
        index:index,
        check:check
      }
      this.apiservice.deleteOneCompleteNoteFromSemesterNotes(this.obj1).subscribe({
        next:data=>{
          this.setProperties(false,"Notes are deleted","alert-success")
          this.getAllNotes();
        },
        error:error=>{
          this.setProperties(false,"Notes are not deleted","alert-danger")
        }

      })
  }
  getAllNotes(){
    this.obj={
      course:this.course,
      email:sessionStorage.getItem('email')
    }
    this.apiservice.getAllSemesterNotes(this.obj).subscribe({
      next:data=>{
        this.AllNotes=data
        this.searchNotes=data
        console.log(this.AllNotes)
      },
      error:error=>{

      }
    })
  }
  getSemesterNotes(){

    this.courseList=this.courseService.getOneCourses(this.course);
    this.subjects=this.courseService.getOneCourseDetails(this.course);
    console.log(this.courseList)
    console.log(this.subjects)
  }
  showSubjects(semester){
    this.anotherSubjectsList=this.subjects.filter((o)=>{
      if(o.course==this.course && o.semester==semester){
        return true
      }
      else{
        return false
      }
    })
    if(this.anotherSubjectsList.length==0){
      this.setProperties(false,"No Subject Found","alert-warning")
      this.setTimeMethod(10000)
    }
    else{
      this.unsetProperties()
    }
    console.log(this.anotherSubjectsList)
  } 
  onSubmit(form){
    console.log(form.value.semester)
    console.log(form.value.subject)
    this.searchNotes=this.AllNotes.filter(o=>{
      if(o.course==this.course && o.semester==form.value.semester && o.subject==form.value.subject){
        return true
      }
      else{
        return false
      }
    })
    if(this.searchNotes.lenght==0){
      this.setProperties(false,"No Notes are Found","alert-warning")
      this.setTimeMethod(10000)
    }
    else{
      this.unsetProperties();
    }
  }
  searchTopic(id){
    this.searchNotes=this.searchNotes.filter((o)=>{
      if(o.topic==id){
        return true
      }
      else{
        return false
      }
    })
    if(this.searchNotes.lenght==0){
      this.setProperties(false,"No Notes are Found","alert-warning")
      this.setTimeMethod(10000)
    }
    else{
      this.unsetProperties();
    }
  }
  allNotes(){
    this.searchNotes=this.AllNotes
    if(this.searchNotes.lenght==0){
      this.setProperties(false,"No Notes are Found","alert-warning")
      this.setTimeMethod(10000)
    }
    else{
      this.unsetProperties();
    }
  }
  download(name,check){
    this.obj4={
      name:name,
      check:check
    }
    this.apiservice.downloadNotes(this.obj4).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      } 
    )
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
