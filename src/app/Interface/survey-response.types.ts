export interface SurveyResponse {
  index:number,
  question: string,
  answers: Array<SurveyResponseAnswer>;
}

export interface SurveyResponseAnswer {
  name: string,
  value: number
}
