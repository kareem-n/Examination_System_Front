import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGlobalResponse } from '../interfaces/globalResponse';
import { IPageResult } from '../interfaces/IPageResult';
import { IQeustionAdmin } from '../interfaces/IQuestionAdmin';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  baseUrl = 'https://localhost:7109/api/Question';

  GetAll() {

    return this.ActivatedRoute.queryParams.pipe(
      map((param) => {
        let q = '?';
        q += param['PageSize'] ? 'pageSize=' + param['PageSize'] + '&' : '';
        q += param['PageNumber']? 'pageNumber=' + param['PageNumber'] + '&' : '';
        q += param['subjectId']? 'subjectId=' + param['subjectId'] + '&' : '';
        return q;
      }),
      switchMap((q) => {
        return this.HttpClient.get<
          IGlobalResponse<IPageResult<IQeustionAdmin>>
        >(this.baseUrl + q);
      })
    );
  }

  CreateQuestion(body: {
    questionTitle: string;
    difficultyLevel: number;
    subjectId: string;
    choices: {
      answerTxt: string;
      isCorrect: boolean;
    }[];
  }) {
    console.log(body);

    return this.HttpClient.post(this.baseUrl, body);
  }

  constructor(
    private HttpClient: HttpClient,
    private ActivatedRoute: ActivatedRoute
  ) {}
}
