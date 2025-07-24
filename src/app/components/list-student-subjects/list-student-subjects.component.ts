import { Component, OnInit } from '@angular/core';
import { ISubject } from '../../interfaces/ISubject';
import { IGlobalResponse } from '../../interfaces/globalResponse';
import { SubjectsService } from '../../_services/subjects.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { RouterLink } from '@angular/router';
import { IPageResult } from '../../interfaces/IPageResult';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

interface SortBy {
  name: string;
  code: string;
}

@Component({
  selector: 'app-list-student-subjects',
  imports: [
    RouterLink,
    ButtonModule,
    DividerModule,
    BadgeModule,
    InputTextModule,
    FormsModule,
    Select,
    PaginatorModule,
  ],
  templateUrl: './list-student-subjects.component.html',
  styleUrl: './list-student-subjects.component.css',
})
export class ListStudentSubjectsComponent implements OnInit {
  data: IGlobalResponse<IPageResult<ISubject>> | null = null;

  onPageChange(event: PaginatorState) {

    this.query.pageIndex = event.page && event.page + 1;
    this.query.pageSize = event.rows && event.rows;

    this.LoadData();

    // this.first = event.first ?? 0;
    // this.rows = event.rows ?? 10;
  }

  ///
  query: {
    search?: string;
    sort?: string;
    pageSize?: number;
    pageIndex?: number;
  } = {};
  ///
  searchTerm: string = '';
  loading!: boolean;
  ///
  orderby: SortBy[] | undefined;
  selectedCity: SortBy | undefined;
  ///
  constructor(private subjectSerive: SubjectsService) {}
  ///
  ngOnInit(): void {
    this.orderby = [
      { name: 'Title', code: 'title' },
      { name: 'Description', code: 'description' },
      { name: 'Number of Questions', code: 'numberOfQuestions' },
    ];
    ///

    this.LoadData();
  }

  LoadData() {
    this.subjectSerive.GetAllSubjects(this.query).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.data = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Sort() {
    this.query.sort = this.selectedCity?.code;
    this.LoadData();
  }

  search() {
    this.loading = true;

    this.query!.search = this.searchTerm;

    this.LoadData();
  }
}
