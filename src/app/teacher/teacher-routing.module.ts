import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDailyNotesComponent } from './add-daily-notes/add-daily-notes.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { DailynotesComponent } from './dailynotes/dailynotes.component';
import { SemesternotesComponent } from './semesternotes/semesternotes.component';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  { 
     path: '',
     component: TeacherComponent,
     children:[
       {
         path:'Notes',
         component:AddDailyNotesComponent
       },
       {
        path:"addNotes/:course",
        component:AddNotesComponent
       },{
         path:"dailyNotes/:course",
         component:DailynotesComponent
       },
       {
         path:"semesterNotes/:course",
         component:SemesternotesComponent
       },
       
     ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
