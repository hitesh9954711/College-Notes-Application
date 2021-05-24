import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/admin/dialog/dialog.component';
import { Model } from 'src/app/admin/Model';
import { TeacherDialogComponent } from '../teacher-dialog/teacher-dialog.component';
import { TeachercourseserviceService } from '../teachercourseservice.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent extends Model implements OnInit {
  course:string;
  courseList:any=[];
  subjects:any=[];
  anotherSubjectsList:any=[];
  check:boolean=false;
  constructor(public activatedRoute:ActivatedRoute,public courseService:TeachercourseserviceService,public dialog:MatDialog) {
    super();
  }
  openDialogForUpdate(obj,index,course){
    console.log(obj)
    let ref=this.dialog.open(TeacherDialogComponent,{data:{name:'addNotes',object:obj,index:index,course:course}});
    ref.afterClosed().subscribe(data=>{
      console.log(data)
    })
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.course=data.course;
    });
    this.courseList=this.courseService.getOneCourses(this.course);
    this.subjects=this.courseService.getOneCourseDetails(this.course);
    console.log(this.courseList)
    console.log(this.subjects)
  }
  showSubjects(semester,course){
    this.anotherSubjectsList=[]
    for(let value of this.subjects){
        if(value.course==course && value.semester==semester){
          this.anotherSubjectsList.push(value);
        }
    } 
    if(this.anotherSubjectsList.length==0){
      this.check=true
    } 
    else{
      this.check=false
    }
 }

}
