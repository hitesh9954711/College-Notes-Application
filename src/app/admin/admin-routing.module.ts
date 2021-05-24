import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { AddCourseDetailComponent } from './courses/add-course-detail/add-course-detail.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { CreateAdminComponent } from './courses/create-admin/create-admin.component';
import { DeleteadminComponent } from './courses/deleteadmin/deleteadmin.component';
import { DeletecourseComponent } from './courses/deletecourse/deletecourse.component';
import { DeleteteacherComponent } from './courses/deleteteacher/deleteteacher.component';
import { TeacherRequestsComponent } from './teacher-requests/teacher-requests.component';
import { ViewAllAdminsComponent } from './view-all-admins/view-all-admins.component';
import { ViewallcourseComponent } from './viewallcourse/viewallcourse.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children:[
      {
        path:'viewAllCourses',
        component:ViewallcourseComponent
      },
      {
        path:'viewAllTeachers',
        component:AllTeachersComponent
      },
      {
        path:'viewAllTeacherRequests',
        component:TeacherRequestsComponent
      },
      {
        path:'viewAllAdmins',
        component:ViewAllAdminsComponent
      },
      {
        path:'courseDetails/:course',
        component:CoursedetailsComponent
      },
    {
      path:'courses',
      component:CoursesComponent,
      children:[
        {
          path:'addCourse',
          component:AddCourseComponent
        },
        {
          path:'addCourseDetail',
          component:AddCourseDetailComponent
        },
        {
          path:'addAdmin',
          component:CreateAdminComponent
        },
        {
          path:'deleteAdmin',
          component:DeleteadminComponent
        },
        {
          path:'deleteTeacher',
          component:DeleteteacherComponent
        },
        {
          path:'deleteCourses',
          component:DeletecourseComponent
        }
      ]
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
