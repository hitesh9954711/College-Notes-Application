import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CoursesComponent } from './courses/courses.component';
import { MatIconModule } from '@angular/material/icon';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseDetailComponent } from './courses/add-course-detail/add-course-detail.component';
import { ViewallcourseComponent } from './viewallcourse/viewallcourse.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatInputModule} from '@angular/material/input';
import { TeacherRequestsComponent } from './teacher-requests/teacher-requests.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { ViewAllAdminsComponent } from './view-all-admins/view-all-admins.component';
import { CreateAdminComponent } from './courses/create-admin/create-admin.component';
import { DeleteteacherComponent } from './courses/deleteteacher/deleteteacher.component';
import { DeleteadminComponent } from './courses/deleteadmin/deleteadmin.component';
import { DeletecourseComponent } from './courses/deletecourse/deletecourse.component';
@NgModule({
  declarations: [
    AdminComponent,
    CoursesComponent,
    AddCourseComponent,
    AddCourseDetailComponent,
    ViewallcourseComponent,
    CoursedetailsComponent,
    DialogComponent,
    TeacherRequestsComponent,
    AllTeachersComponent,
    ViewAllAdminsComponent,
    CreateAdminComponent,
    DeleteteacherComponent,
    DeleteadminComponent,
    DeletecourseComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class AdminModule { }
