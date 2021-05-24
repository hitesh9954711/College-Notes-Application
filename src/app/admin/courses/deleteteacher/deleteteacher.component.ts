import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../admin-service.service';
import { Model } from '../../Model';

@Component({
  selector: 'app-deleteteacher',
  templateUrl: './deleteteacher.component.html',
  styleUrls: ['./deleteteacher.component.css']
})
export class DeleteteacherComponent extends Model implements OnInit {
  deleteTeacherForm:FormGroup
  object:{
    course:string
  }
  constructor(public formBuilder:FormBuilder,public service:AdminServiceService) {
    super();
  }

  ngOnInit(): void {
    this.deleteTeacherForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }
  onSubmit(){
    this.progress=true
    if(this.deleteTeacherForm.valid==true){
      this.object={
        course:this.deleteTeacherForm.get('email').value
      }
      this.service.deleteTeacher(this.object).subscribe({
        next:data=>{
          this.setProperties(false,"Teacher is deleted successfully","alert-success")
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
