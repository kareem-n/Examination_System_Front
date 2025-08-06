import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../../../../_services/subjects.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ISubject } from '../../../../interfaces/ISubject';
import { QuestionsService } from '../../../../_services/questions.service';

@Component({
  selector: 'app-add-question',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MessageModule,
    CommonModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    FormsModule,
    SelectModule,
  ],
  standalone: true,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {
  @Input({ required: true }) showEdit!: boolean;
  @Output() showedit = new EventEmitter<boolean>(false);
  @Output() reloadData = new EventEmitter<boolean>(false);

  difficultyLevels = [
    { label: 'Easy', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'Hard', value: 2 },
  ];

  size = false;

  servError:string[] = [];

  form = new FormGroup({
    questionHead: new FormControl('', Validators.required),
    difficulty: new FormControl(null, Validators.required),
    subject: new FormControl(null, Validators.required),
    ans1: new FormControl('', [Validators.required]),
    ans2: new FormControl('', [Validators.required]),
    ans3: new FormControl('', [Validators.required]),
    ans4: new FormControl('', [Validators.required]),
    correct: new FormControl(null, [Validators.required]),
  });

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  save() {
    if (this.form.valid) {
      this.questionsService
        .CreateQuestion({
          questionTitle: this.form.value.questionHead!,
          difficultyLevel: this.form.value.difficulty?.['value']!,
          subjectId: this.form.value.subject?.['value']!,
          choices: [
            {
              answerTxt: this.form.value.ans1!,
              isCorrect: this.form.value.correct! == 1,
            },
            {
              answerTxt: this.form.value.ans2!,
              isCorrect: this.form.value.correct! == 2,
            },
            {
              answerTxt: this.form.value.ans3!,
              isCorrect: this.form.value.correct! == 3,
            },
            {
              answerTxt: this.form.value.ans4!,
              isCorrect: this.form.value.correct! == 4,
            },
          ],
        })
        .subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Subject Created Successfully',
              life: 5000,
            });
            this.reloadData.next(true);
            this.showedit.next(false);
          },
          error: (err) => {
            console.log(err?.["error"]?.["errors"][0]);
            
            this.servError.push(err?.["error"]?.["errors"][0]?.['errors'][0]);  
          }, 
        });
      console.log(this.form);
    } else {
      this.form.markAllAsTouched();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private questionsService: QuestionsService,
    private messageService: MessageService
  ) {}

  SUbjectList: { label: string; value: string }[] = [];

  ngOnInit(): void {
    this.subjectsService.GetAllSubjects({}).subscribe({
      next: (res) => {
        res.data.items.map((item) => {
          this.SUbjectList?.push({ label: item.title, value: item.id });
        });

        console.log(this.SUbjectList);
      },
    });
  }

  subjetcId: string = '';
}
