import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SubjectsService } from '../../../_services/subjects.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-subject',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MessageModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css',
})
export class AddSubjectComponent {
  @Input({ required: true }) showEdit!: boolean;
  @Output() showedit = new EventEmitter<boolean>(false);
  @Output() reloadData = new EventEmitter<boolean>(false);

  servError = '';

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    totalQuestions: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
    easy: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    meduim: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    hard: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });

  save() {
    if (this.form.valid) {
      this.subjectsService
        .AddNewSubject({
          title: this.form.value.title!,
          description: this.form.value.description!,
          easy: this.form.value.easy!,
          hard: this.form.value.hard!,
          normal: this.form.value.meduim!,
          numberOfQuestions: this.form.value.totalQuestions!,
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
            console.log(err);
            this.servError = err?.['error']?.['message'];
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
    private messageService: MessageService
  ) {}

  subjetcId: string = '';
}
