import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/admin/Model';
import { AddUnitComponentComponent } from '../add-unit-component/add-unit-component.component';
import { TeacherApiServiceService } from '../teacher-api-service.service';
import { saveAs } from 'file-saver';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Model1 } from '../Model1';
@Component({
  selector: 'app-teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.css']
})
export class TeacherDialogComponent extends Model1 implements  OnInit {
  // notesForm:FormGroup
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
   form=new FormData()
  subject:string;
  object:any;
  selectedVideos:File[];
  selectedFiles:File[];
  checked=true
  disabled=true
  fileCheck:boolean
  videoCheck:boolean
  units:string[]=['UNIT-1','UNIT-2','UNIT-3','UNIT-4']
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog,private formBuilder:FormBuilder,private teacherApiService:TeacherApiServiceService) {
    super();
  }

  ngOnInit(): void {
    this.object=this.data.object
    this.subject=this.object.subjects[this.data.index];
    // this.notesForm=this.formBuilder.group({
    //   unit:[''],
    //   topicName:[''],
    //   check:['']
    // })
  }
  addUnit(id){
    console.log(id)
  }
  onVideoSelected(event){
    this.selectedVideos=event.target.files;
    for(const value of this.selectedVideos){
      this.form.append('videos',value,value.name)
      } 
  }
  onFileSelected(event){
    this.selectedFiles=event.target.files
      for(const value of this.selectedFiles){
        this.form.append('files',value,value.name)
    }
  }

  updateNote(){
    this.progress1=true
    this.form.append("id",this.data.id)
    this.teacherApiService.updateNotes(this.form).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
        
      },

      (error: HttpErrorResponse) => {
        this.setProperties(false,"Something went wrong","alert-danger")
        this.setTimeMethod(10000)
      }

    )
  }
  updateSemesterNote(){
    console.log("worked")
    this.form.append("id",this.data.id)
    this.teacherApiService.updateSemesterNotes(this.form).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
        
      },

      (error: HttpErrorResponse) => {
        this.setProperties(false,"Something went wrong","alert-danger")
        this.setTimeMethod(10000)
      }

    )
    
  }
  openDialog(){
    let ref=this.dialog.open(AddUnitComponentComponent);
    ref.afterClosed().subscribe(data=>{
      this.units.push(data.toUpperCase())
    })
  }
  onSubmit(form){
    this.progress1=true
    if(form.valid==true){
      this.form.append('course',this.data.course)
      this.form.append('semester',this.object.semester)
      this.form.append('subject',this.subject)
      this.form.append('unit',form.value.unit)
      this.form.append('topic',form.value.topicName)
      this.form.append('date',new Date().toLocaleDateString())
      this.form.append('check',form.value.check)
      this.form.append('email',sessionStorage.getItem("email"))
      this.teacherApiService.addNotes(this.form).subscribe(
        event => {
          console.log(event);
          this.resportProgress(event);
          
        },
 
        (error: HttpErrorResponse) => {
          this.setProperties(false,"Something went wrong","alert-danger")
          this.setTimeMethod(10000)
        }
      )
       this.form.delete('course')
      this.form.delete('semester')
      this.form.delete('subject')
      this.form.delete('unit')
      this.form.delete('topic')
      this.form.delete('date')
      this.form.delete('check')
      this.form.delete('email')
    }
    else{
      this.setProperties(false,"Please Fill The Form","alert-danger")
      this.setTimeMethod(10000)
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
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          // saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
          //         {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
