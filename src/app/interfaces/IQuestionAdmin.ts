export interface IQeustionAdmin {
  id: string;
  questionTitle: string;
  SubjectName: string;
  questionAnswerDtos: [
    {
      answerTxt: string;
      isCorrect: false;
    },
    {
      answerTxt: string;
      isCorrect: false;
    },
    {
      answerTxt: string;
      isCorrect: false;
    },
    {
      answerTxt: string;
      isCorrect: true;
    }
  ];
}
