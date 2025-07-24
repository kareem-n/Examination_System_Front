import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGlobalResponse } from '../interfaces/globalResponse';
import { IExam } from '../interfaces/IExam';
import { IExamQuestionAnswer } from '../interfaces/ExamQuestionAnswer';
import { IUserExam } from '../interfaces/IUserExam';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  baseUrl = 'https://localhost:7109/api/Exam';

  constructor(private http: HttpClient) {}

  TakeExam(subjectId: string) {
    return this.http.post<{ data: IExam }>(
      this.baseUrl + `/take-exam/${subjectId}`,
      null,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  submitExam(answers: {
    examId: string;
    ExamQuestionsAnswers: IExamQuestionAnswer[];
  }) {
    return this.http.post(
      this.baseUrl + `/submit-exam/${answers.examId}`,
      answers,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  GetUserExam() {
    return this.http.get<IGlobalResponse<IUserExam>>(this.baseUrl + '/GetUserExams', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
