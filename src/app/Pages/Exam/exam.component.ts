import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamService } from '../../_services/exam.service';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { RadioButton } from 'primeng/radiobutton';
import { IExam } from '../../interfaces/IExam';
import { FormsModule } from '@angular/forms';
import { Tag } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

import { interval, Subscription } from 'rxjs';
import { IExamQuestionAnswer } from '../../interfaces/ExamQuestionAnswer';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-exam',
  imports: [
    CommonModule,
    ButtonModule,
    StepperModule,
    RadioButton,
    FormsModule,
    ChipModule,
    MessageModule, 
    RouterLink
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit {
  data: IExam | null = null;
  serverError: string = '';
  test = '';

  minutes: number = 0;
  seconds: number = 0;

  answers: IExamQuestionAnswer[] = [];

  constructor(private activeRoute: ActivatedRoute, private exam: ExamService) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];

    if (id) {
      this.exam.TakeExam(id).subscribe({
        next: (res) => {
          const current = new Date(new Date().toISOString());
          const end = new Date(res.data.endTime);

          const diffMs = end.getTime() - current.getTime();
          this.minutes = Math.floor(diffMs / (1000 * 60));
          this.seconds = Math.floor((diffMs / 1000) % 60);

          this.startCountdown();

          res.data.questions.map((q) => {
            this.answers.push({ questionId: q.id, answerId: null });
          });

          this.data = res.data;
        },
        error: (err) => {
          this.serverError = err?.['error']?.['message'];
          console.log(this.serverError);
        },
      });
    }
  }

  private countdownSub!: Subscription;

  startCountdown(): void {
    // Stop any existing countdown
    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }

    this.countdownSub = interval(1000).subscribe(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        this.countdownSub.unsubscribe();
        return;
      }

      if (this.seconds === 0) {
        if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }
  }

  selectAnswer(questionId: string, answerId: string) {
    let existQuestion = this.answers.find((q) => q.questionId == questionId);

    if (existQuestion) {
      existQuestion.answerId = answerId;
    } else {
      this.answers.push({ questionId, answerId });
    }
    this.test = '';
  }

  fireErrors: boolean = false;
  submit:boolean = false ;

  submitExam() {
    if (this.answers.every((a) => a.answerId != null)) {
      this.exam
        .submitExam({
          examId: this.data?.id!,
          ExamQuestionsAnswers: this.answers,
        })
        .subscribe({
          next: (res) => {
            this.data = null ;
            this.submit = true ;
            console.log(res);
            
          },
        });
    } else {
      this.fireErrors = true;
    }
  }

  shouldHighLight(questionId: string): boolean {
    let flag = false;
    if (this.fireErrors) {
      this.answers.map((an) => {
        if (an.questionId == questionId && an.answerId == null) {
          flag = true;
        }
      });
    }
    return flag;
  }
}
