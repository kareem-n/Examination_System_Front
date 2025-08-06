import { Component } from '@angular/core';
import { IGlobalResponse } from '../../../interfaces/globalResponse';
import { IPageResult } from '../../../interfaces/IPageResult';
import { PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { SubjectsService } from '../../../_services/subjects.service';
import { ISubject } from '../../../interfaces/ISubject';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { EditSubjectComponent } from '../edit-subject/edit-subject.component';
import { BadgeModule } from 'primeng/badge';
import { AddSubjectComponent } from "../add-subject/add-subject.component";
@Component({
  selector: 'app-subjects',
  imports: [
    TableModule,
    CommonModule,
    PaginatorModule,
    ButtonModule,
    ConfirmDialog,
    ToastModule,
    DialogModule,
    EditSubjectComponent,
    BadgeModule,
    AddSubjectComponent
],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
  providers: [ConfirmationService, MessageService],
})
export class SubjectsComponent {
  data: IGlobalResponse<IPageResult<ISubject>> | null = null;

  showEdit = false;

  query: { pageSize?: number; pageNumber?: number } = {};

  onPageChange(event: PaginatorState) {
    this.LoadData();

    this.router.navigate([], {
      queryParams: {
        PageNumber: event.page! + 1,
        PageSize: event.rows ? event.rows : 10,
      },
      queryParamsHandling: 'merge',
    });
  }

  cols = [
    { field: 'title', header: 'Subject Title' },
    { field: 'description', header: 'Description' },
    { field: 'totalQuestions', header: 'Questions' },
    { field: 'test', header: 'Props' },
    { field: 'controlls', header: 'Controlls' },
  ];

  constructor(
    private subjects: SubjectsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private Route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.LoadData();
  }

  toEdit: ISubject | null = null;

  openDialog(id: string) {
    this.toEdit = this.data?.data.items.find((item) => item.id == id) ?? null;
    // console.log(this.toEdit);

    this.showEdit = true;
    this.router.navigate([], {
      relativeTo: this.Route,
      queryParams: { id },
      queryParamsHandling: 'merge',
    });
  }

  LoadData() {
    this.subjects.GetAllSubjects({}).subscribe({
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

  confirm2(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.subjects.DelSubject(id).subscribe({
          next: (res) => {
            console.log(res);

            this.messageService.add({
              severity: 'success',
              summary: 'Confirmed',
              detail: 'Record deleted',
            });

            this.LoadData();
          },
          error: (err) => {
            console.log(err);

            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'something Went Wrong',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  closeAddDialog($event:boolean){
    this.showAddDialog = $event ;
  }


  showAddDialog = false ;
  AddnewSubjectDialog() {}
}
