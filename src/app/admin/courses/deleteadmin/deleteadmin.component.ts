import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../admin-service.service';
import { Model } from '../../Model';

@Component({
  selector: 'app-deleteadmin',
  templateUrl: './deleteadmin.component.html',
  styleUrls: ['./deleteadmin.component.css']
})
export class DeleteadminComponent extends Model implements OnInit {
  adminDeleteForm:FormGroup
  object:{
    course:string
  }
  constructor(public formBuilder:FormBuilder,public service:AdminServiceService) {
    super();
  }

  ngOnInit(): void {
    this.adminDeleteForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }
  onSubmit(){
    this.progress=true
    if(this.adminDeleteForm.valid==true){
      this.object={
        course:this.adminDeleteForm.get('email').value
      }
      this.service.deleteAdmin(this.object).subscribe({
        next:data=>{
          this.setProperties(false,"Admin is deleted successfully","alert-success")
          this.setTimeMethod(10000)
        },
        error:error=>{
          this.setProperties(false,"Something went wrong","alert-danger")
          this.setTimeMethod(10000)
        }
      })
    }
    else{
      this.setProperties(false,"Please Enter the email","alert-warning")
      this.setTimeMethod(10000)
    }
  }
}
