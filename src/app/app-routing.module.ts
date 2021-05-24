import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherRegisterationComponent } from './register/teacher-registeration/teacher-registeration.component';
import {StudentRegisterationComponent} from'./register/student-registeration/student-registeration.component'
import { AdminGuardGuard } from './admin-guard.guard';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentGuardGuard } from './student-guard.guard';
import { TeacherGuardGuard } from './teacher-guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WildcardComponent } from './wildcard/wildcard.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent,
    children:[
      {
        path:'teacherRegistration',
        component:TeacherRegisterationComponent
      },
      {
        path:'studentRegistration',
        component:StudentRegisterationComponent 
      } ,
     
    ]
  },
  {
    path:'resetPassword',
    component:ForgotPasswordComponent
  } ,
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canLoad:[AdminGuardGuard] },
  { path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),canLoad:[TeacherGuardGuard] },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule),canLoad:[StudentGuardGuard] },
  { path:'**',component:WildcardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
