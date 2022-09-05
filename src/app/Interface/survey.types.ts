export interface Survey {
  id: number,
  name: string,
  startDate: string,
  rawStartDate: Date,
  endDate: string,
  rawEndDate: Date,
  employeeUsername: string,
  status:string,
  questions: Array<SurveyQuestion>,
  responsesCount:number
}

export interface SurveyQuestion {
  id: number,
  index: number,
  text: string,
  surveyId: number,
  surveyName: string,
  answerOptions: Array<SurveyQuestionAnswerOption>
}

export interface SurveyQuestionAnswerOption {
  id: number,
  text: string,
  surveyQuestionId: number,
  surveyQuestionTitle: string,
  surveyId: number,
  surveyName: string
}

export interface SurveyAnswersPool {
  id: number,
  text: string;
  surveyQuestionsCount: number,
}
