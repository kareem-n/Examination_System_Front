import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { IPageResult } from '../../../interfaces/IPageResult';
import { IGlobalResponse } from '../../../interfaces/globalResponse';
import { ISubject } from '../../../interfaces/ISubject';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { QuestionsService } from '../../../_services/questions.service';
import { IQeustionAdmin } from '../../../interfaces/IQuestionAdmin';
import { TagModule } from 'primeng/tag';
import { AddQuestionComponent } from '../../../components/admin/questions/add-question/add-question.component';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { SubjectsService } from '../../../_services/subjects.service';

@Component({
  selector: 'app-questions',
  imports: [
    Select,
    FormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    BadgeModule,
    PaginatorModule,
    ToastModule,
    TagModule,
    ConfirmDialogModule,
    AddQuestionComponent,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
  providers: [ConfirmationService, MessageService],
})
export class QuestionsComponent {
  data: IGlobalResponse<IPageResult<IQeustionAdmin>> | null = null;

  subjects: { name: string; code: string }[] = [];
  selectedSubject!: { name: string; code: string };

  showEdit = false;

  query: { pageSize?: number; pageNumber?: number } = {};

  onPageChange(event: PaginatorState) {
    this.router.navigate([], {
      queryParams: {
        PageNumber: event.page! + 1,
        PageSize: event.rows ? event.rows : 10,
      },
      queryParamsHandling: 'merge',
    });
    this.LoadData();
  }

  cols = [
    { field: 'questionTitle', header: 'Question Head' },
    { field: 'subjectName', header: 'Subject Title' },
    { field: 'questionAnswerDtos', header: 'Answers' },
    { field: 'controlls', header: 'Controlls' },
  ];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private questions: QuestionsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private Route: ActivatedRoute,
    private SubjectsService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.LoadData();
    this.SubjectsService.GetAllSubjects({}).subscribe((res) => {
      this.subjects = res.data.items.map((item) => {
        return { name: item.title, code: item.id };
      });

      // this.selectedSubject = this.subjects[0];
    });
    // this.subjects =
  }

  toEdit: ISubject | null = null;

  openDialog(id: string) {
    // this.toEdit = this.data?.data.items.find((item) => item.id == id) ?? null;
    // console.log(this.toEdit);

    this.showEdit = true;
    this.router.navigate([], {
      relativeTo: this.Route,
      queryParams: { id },
      queryParamsHandling: 'merge',
    });
  }

  LoadData() {
    this.questions.GetAll().subscribe({
      next: (res) => {
        this.data = res;
        console.log(res);
      },
      error: (err) => {
        if (err?.['error']?.['statusCode'] == 404) {
          // this.data?.data?.items = [] ;
        }
      },
    });
  }

  test($event: boolean) {
    this.showEdit = false;
    this.router.navigate([], {
      relativeTo: this.Route,
      queryParams: { id: null },
      queryParamsHandling: 'merge',
    });
  }

  closeAddDialog($event: boolean) {
    this.showAddDialog = $event;
  }

  subjectSelectedChange() {
    this.router.navigate([], {
      relativeTo: this.ActivatedRoute,
      queryParams: { subjectId: this.selectedSubject.code },
      queryParamsHandling: 'merge',
    });
    // console.log(this.selectedSubject);
  }

  showAddDialog = false;
  AddnewSubjectDialog() {}
}
