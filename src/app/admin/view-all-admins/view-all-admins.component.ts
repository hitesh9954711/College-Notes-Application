import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Model } from '../Model';

@Component({
  selector: 'app-view-all-admins',
  templateUrl: './view-all-admins.component.html',
  styleUrls: ['./view-all-admins.component.css']
})
export class ViewAllAdminsComponent extends Model implements OnInit {
  adminList:any[];
  constructor(public adminService:AdminServiceService) {
    super();
  }

  ngOnInit(): void {
    this.progress=true
    this.adminService.getAdminList().subscribe({
      next:data=>{
        this.adminList=data
        if(this.adminList.length==0){
          this.setProperties(false,"No Record Found","alert-danger")
          this.setTimeMethod(10000)
        }
        else{
          this.progress=false
        }
      },
      error:error=>{
          this.setProperties(false,"Something Went Wrong","alert-danger")
      }
    })
  }

}
