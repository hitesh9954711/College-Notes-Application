import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from '../admin/dialog/dialog.component';
import { LogoutService } from '../logout.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  name:string
  messages:string
  constructor(private router:Router,public snackBar: MatSnackBar,public matDialog:MatDialog,public logoutservice:LogoutService) { }

  ngOnInit(): void {
    this.name=sessionStorage.getItem("name");
    this.messages="welcome "+this.name
     this.openSnackBar(this.messages,"cancel")
     this.router.navigateByUrl("/student/dailynotes")
   }
   openSnackBar(message: string, action:string) {
     
     this.snackBar.open(this.messages, action,{
       duration:2000
     });
  }
  openDialog() {
    let ref=this.matDialog.open(DialogComponent,{data:{name:'studentProfile'}});
    ref.afterClosed().subscribe(data=>{
    })
  }

  logout(){
    this.logoutservice.logout()
  }

}
