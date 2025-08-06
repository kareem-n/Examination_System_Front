import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGlobalResponse } from '../interfaces/globalResponse';
import { IUsersPerMonth } from '../interfaces/IUsersPerMonth';
import { ITopExamsSubjects } from '../interfaces/ITopExamsSubjects';
import { IExamStatuesTotalCount } from '../interfaces/IExamStatuesTotalCount';
import { ITotalStatues } from '../interfaces/ITotalsStaues';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  baseUrl = 'https://localhost:7109/api/Dashboard';

  GetUsersPerMonth() {
    return this.http.get<IGlobalResponse<IUsersPerMonth>>(
      this.baseUrl + '/GetUsersPerMonth'
    );
  }

  GetTopExamsSubjects() {
    return this.http.get<IGlobalResponse<ITopExamsSubjects[]>>(
      this.baseUrl + '/GetTopExamsSubjetc'
    );
  }

  GetSuccessFailStatus() {
    return this.http.get<IGlobalResponse<IExamStatuesTotalCount>>(
      this.baseUrl + '/GetScoreCount'
    );
  }


  GetTotals() {
    return this.http.get<IGlobalResponse<ITotalStatues>>(
      this.baseUrl + '/GetTotals'
    );
  }

  constructor(private http: HttpClient) {}
}
