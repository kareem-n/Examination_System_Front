import { Routes } from '@angular/router';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { studentGuard } from './_guards/student.guard';
import { ListStudentSubjectsComponent } from './components/list-student-subjects/list-student-subjects.component';
import { ExamComponent } from './Pages/Exam/exam.component';
import { StudentHistoryComponent } from './Pages/student-history/student-history.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { SubjectsComponent } from './components/admin/subjects/subjects.component';
import { QuestionsComponent } from './compotnents/admin/questions/questions.component';
import { StudentHomePageComponent } from './Pages/student-home-page/student-home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    canActivate: [studentGuard],
    children: [
      { path: 'home', component: StudentHomePageComponent },
      { path: 'subjects', component: ListStudentSubjectsComponent },
      { path: '', redirectTo: 'subjects', pathMatch: 'full' },
      { path: 'exam/:id', component: ExamComponent },
      { path: 'history', component: StudentHistoryComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [adminGuard],

    children: [
      { path: '', redirectTo: 'stat', pathMatch:'full' },
      { path: 'stat', component: AdminHomeComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'questions', component: QuestionsComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
