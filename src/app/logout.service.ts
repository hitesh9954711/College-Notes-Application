import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGuardGuard } from './admin-guard.guard';
import { StudentGuardGuard } from './student-guard.guard';
import { TeacherGuardGuard } from './teacher-guard.guard';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private route:Router,private adminGuard:AdminGuardGuard,private teacherGuard:TeacherGuardGuard,private studentGuard:StudentGuardGuard) { }
  
  logout(){
    sessionStorage.clear();
    this.adminGuard.setCheck(false)
    this.teacherGuard.setCheck(false)
    this.studentGuard.setCheck(false)
    this.route.navigateByUrl("")
  }
}
