export interface IExam {
  durationInMinutes: number;
  endTime: Date;
  id: string;
  questions: {
    id: string;
    options: {
      answerTxt: string;
      id: string;
    }[];
    questionTxt: string;
  }[];
  startTime: Date;
  status: string;
  title: string;
}
