import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { studentGuard } from './_guards/student.guard';
import { ListStudentSubjectsComponent } from './components/list-student-subjects/list-student-subjects.component';
import { ExamComponent } from './Pages/Exam/exam.component';
import { StudentHistoryComponent } from './Pages/student-history/student-history.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    canActivate: [studentGuard],
    // pathMatch: 'full',
    children: [
      { path: 'subjects', component: ListStudentSubjectsComponent },
      { path: '',  redirectTo: "subjects" , "pathMatch": "prefix" },
      // { path: 'exam/:id', component: ExamComponent }, 
      // { path: 'history', component: StudentHistoryComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
