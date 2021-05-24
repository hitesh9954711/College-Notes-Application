import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { AddDailyNotesComponent } from './add-daily-notes/add-daily-notes.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { AddNotesComponent } from './add-notes/add-notes.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddUnitComponentComponent } from './add-unit-component/add-unit-component.component';
import { DailynotesComponent } from './dailynotes/dailynotes.component';
import { SemesternotesComponent } from './semesternotes/semesternotes.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
@NgModule({
  declarations: [
    TeacherComponent,
    AddDailyNotesComponent,
    AddNotesComponent,
    TeacherDialogComponent,
    AddUnitComponentComponent,
    DailynotesComponent,
    SemesternotesComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class TeacherModule { }
