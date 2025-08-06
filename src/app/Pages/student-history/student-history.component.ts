import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../_services/exam.service';
import { IGlobalResponse } from '../../interfaces/globalResponse';
import { IUserExam } from '../../interfaces/IUserExam';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { IPageResult } from '../../interfaces/IPageResult';
import {  PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-history',
  imports: [TableModule, CommonModule, Tag, PaginatorModule],
  templateUrl: './student-history.component.html',
  styleUrl: './student-history.component.css',
})
export class StudentHistoryComponent implements OnInit {
  data!: IGlobalResponse<IPageResult<IUserExam>>;

  query: { pageSize?: number; pageNumber?: number } = {};

  onPageChange(event: PaginatorState) {
    
    this.LoadData();

    this.router.navigate([], {
      queryParams: {
        PageNumber: event.page!+1,
        PageSize: event.rows ? event.rows : 10,
      },
      queryParamsHandling: 'merge',
    });
  }

  cols = [
    { field: 'subjectName', header: 'Subject Title' },
    { field: 'startTime', header: 'Start Time' },
    { field: 'endTime', header: 'End Time' },
    { field: 'status', header: 'Status' },
  ];

  constructor(private exam: ExamService, private router: Router) {}
  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this.exam.GetUserExam().subscribe({
      next: (res) => {
        this.data = res;
        console.log(res)  ;
        
      },
    });
  }
}
