import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Model } from '../Model';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent extends Model implements OnInit {
  teacherList:any[];
  constructor(public apiService:AdminServiceService) {
    super();
  }

  ngOnInit(): void {
    this.progress=true
    this.apiService.getTeachers().subscribe({
      next:data=>{
        this.teacherList=data
        if(this.teacherList.length==0){
          this.setProperties(false,"No Record Found","alert-success")
          this.setTimeMethod(10000);
        }
        else{
          this.progress=false;
        }
      },
      error:error=>{
        this.setProperties(false,"Something Went Wrong","alert-danger")
        this.setTimeMethod(10000)
      }
    })
  }

}
