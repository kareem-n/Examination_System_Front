import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubject } from '../interfaces/ISubject';
import { IPageResult } from '../interfaces/IPageResult';
import { IGlobalResponse } from '../interfaces/globalResponse';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  baseUrl = 'https://localhost:7109/api/Subject';

  constructor(private http: HttpClient) {}

  GetAllSubjects(query: {
    search?: string;
    sort?: string;
    pageIndex?: number;
    pageSize?: number;
  }) {
    let q = '?';
    if (query.search) {
      q += `SearchTerm=${query.search}&`;
    }

    if (query.sort) {
      q += `sortby=${query.sort}&`;
    }

    if (query.pageIndex) {
      q += `PageIndex=${query.pageIndex}&`;
    }

    if (query.pageSize) {
      q += `PageSize=${query.pageSize}&`;
    }

    console.log(q);

    return this.http.get<IGlobalResponse<IPageResult<ISubject>>>(
      this.baseUrl + `/allSubjects${q}`
    );
  }

  DelSubject(id: number) {
    return this.http.delete(this.baseUrl + '/DeleteSubject/' + id);
  }

  UpdateSubject(
    id: string,
    body: {
      title: string;
      description: string;
      numberOfQuestions: number;
      easy: number;
      normal: number;
      hard: number;
    }
  ) {
    return this.http.put(this.baseUrl + '/UpdateSubject/' + id, body);
  }

  AddNewSubject(body: {
    title: string;
    description: string;
    numberOfQuestions: number;
    easy: number;
    normal: number;
    hard: number;
  }) {
    return this.http.post(this.baseUrl, body);
  }
}
