export interface IUserExam {
  subjectName: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'completed' | 'evaluated';
}
