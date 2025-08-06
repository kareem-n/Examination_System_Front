import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ISubject } from '../../../interfaces/ISubject';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubjectsService } from '../../../_services/subjects.service';

@Component({
  selector: 'app-edit-subject',
  imports: [CommonModule, ButtonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.css',
})
export class EditSubjectComponent implements OnInit {
  @Input({ required: true }) showEdit!: boolean;
  @Input({ required: true }) ItemEdit!: ISubject;
  @Output() showedit = new EventEmitter<boolean>(false);

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

  patchForm() {
    this.form.patchValue({
      title: this.ItemEdit.title,
      description: this.ItemEdit.description,
      totalQuestions: this.ItemEdit.totalQuestions,
      easy: this.ItemEdit.easy,
      meduim: this.ItemEdit.meduim,
      hard: this.ItemEdit.hard,
    });
  }

  save() {
    if (this.form.valid) {
      this.subjectsService
        .UpdateSubject(this.subjetcId, {
          title: this.form.value.title!,
          description: this.form.value.description!,
          easy: this.form.value.easy!,
          hard: this.form.value.hard!,
          normal: this.form.value.meduim!,
          numberOfQuestions: this.form.value.totalQuestions!,
        })
        .subscribe({
          next: (res) => {
            console.log(res);
          },
        });
      console.log(this.form);
    } else {
      this.form.markAllAsTouched();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  subjetcId: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ItemEdit'] && changes['ItemEdit'].currentValue) {
      this.patchForm();
      // console.log('ItemEdit is now available:', this.ItemEdit);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.subjetcId = id;
    });
  }
}
