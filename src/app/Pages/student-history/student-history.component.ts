import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../_services/exam.service';
import { IGlobalResponse } from '../../interfaces/globalResponse';
import { IUserExam } from '../../interfaces/IUserExam';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { IPageResult } from '../../interfaces/IPageResult';

@Component({
  selector: 'app-student-history',
  imports: [TableModule, CommonModule, Tag],
  templateUrl: './student-history.component.html',
  styleUrl: './student-history.component.css',
})
export class StudentHistoryComponent implements OnInit {
  data!: IGlobalResponse<IPageResult<IUserExam>>;

  cols = [
    { field: 'subjectName', header: 'Subject Title' },
    { field: 'startTime', header: 'Start Time' },
    { field: 'endTime', header: 'End Time' },
    { field: 'status', header: 'Status' },
  ];

  constructor(private exam: ExamService) {}
  ngOnInit(): void {
    // this.exam.GetUserExam().subscribe({
    //   next: (res) => {
    //     this.data = res;
    //     console.log(this.data);

    //     console.log(res);
    //   },
    // });
  }
}
