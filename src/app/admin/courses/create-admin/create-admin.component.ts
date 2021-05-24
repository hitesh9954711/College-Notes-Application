import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../admin-service.service';
import { Model } from '../../Model';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent extends Model implements OnInit {
  adminForm:FormGroup
  constructor(public formBuilder:FormBuilder,public service:AdminServiceService) {
    super();
  }
  object:{
    name:string,
    email:string
  }
  ngOnInit(): void {
    this.adminForm=this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]]
    })
  }
  onSubmit(){
    this.progress=true;
    if(this.adminForm.valid==true){
      this.object={
        name:this.adminForm.get('name').value,
        email:this.adminForm.get('email').value
      }
      this.service.addAdmin(this.object).subscribe({
        next:data=>{
          this.progress=false
          this.message="Admin password is sending  "+this.adminForm.get('email').value
          this.class="alert-success"
          this.setTimeMethod(9000);
        },
        error:error=>{
          this.setProperties(false,"SomeThing Went Wrong or This email is already registered ","alert-danger")
          this.setTimeMethod(10000)
        } 
      })
    }
    else{

    }
  }

}
