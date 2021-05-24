import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemesternotesComponent } from '../teacher/semesternotes/semesternotes.component';
import { NotesComponent } from './notes/notes.component';
import { StudentComponent } from './student.component';
import { StudentdailynotesComponent } from './studentdailynotes/studentdailynotes.component';

const routes: Routes = [
  { 
    path: '', 
    component: StudentComponent,
    children:[
      {
        path:'dailynotes',
        component:StudentdailynotesComponent
      },
      {
        path:'notes',
        component:NotesComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
