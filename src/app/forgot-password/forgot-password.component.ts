import { Component, OnInit } from '@angular/core';
import { Model } from '../admin/Model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends Model implements OnInit {
  obj:{
    userEmail:string,
    userPassword:string
  }
  constructor(private api:ApiService) {
    super();
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    this.progress=true
    if(form.valid==true){
      this.obj={
        userEmail:form.value.email,
        userPassword:form.value.password
      }
      this.api.resetPassword(this.obj).subscribe({
        next:data=>{
          this.setProperties(false,"Password reset successfully","alert-success")
          this.setTimeMethod(10000)
        },
        error:error=>{
          this.setProperties(false,"Enter corrent email","alert-danger")
          this.setTimeMethod(10000)
        }
      })
    }
    else{
      this.setProperties(false,"Please Fill The Form","alert-danger")
      this.setTimeMethod(10000)
    }
  }
}
