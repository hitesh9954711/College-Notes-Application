import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoutService } from '../logout.service';
import { DialogComponent } from './dialog/dialog.component';
import { Model } from './Model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends Model implements OnInit {

  constructor(public activateRoute:ActivatedRoute,public router:Router,
    public snackBar: MatSnackBar,public logoutService:LogoutService,
    public matDialog:MatDialog) {
      
    super();
  }
  object:any;
  name:string;
  token:string;
  role:string;
  messages:string;
  ngOnInit(): void {
   this.name=sessionStorage.getItem("name");
   this.messages="welcome "+this.name
    this.openSnackBar(this.messages,"cancel")
    this.router.navigateByUrl("admin/courses/addCourse")
  }
  openSnackBar(message: string, action:string) {
    
    this.snackBar.open(this.messages, action,{
      duration:2000
    });
  }
  openDialog() {
    let ref=this.matDialog.open(DialogComponent,{data:{name:'profile'}});
    ref.afterClosed().subscribe(data=>{
    })
  }

  logout(){
    this.logoutService.logout()
  }

}
