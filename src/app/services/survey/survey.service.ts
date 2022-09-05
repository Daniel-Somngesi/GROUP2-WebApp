import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getSurveyResponse(surveyId:number) {
    return this._httpClient.get(
      this.endpointBase.concat("Survey/Response/"+surveyId),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getSurvey(surveyId:number) {
    return this._httpClient.get(
      this.endpointBase.concat("Survey/"+surveyId),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllSurveys() {
    return this._httpClient.get(
      this.endpointBase.concat("Survey"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllSurveyQuestions() {
    return this._httpClient.get(
      this.endpointBase.concat("SurveyQuestions"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllSurveyQuestionAnswerOptions() {
    return this._httpClient.get(
      this.endpointBase.concat("SurveyQuestionAnswerOptions"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllSurveyAnswersPool() {
    return this._httpClient.get(
      this.endpointBase.concat("SurveyAnswersPool"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }


  create(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Survey"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  update(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("Survey/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
  updateSurveyQuestion(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("SurveyQuestions/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  updateSurveyQuestionAnswerOption(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("SurveyQuestionAnswerOptions/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  delete(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Survey/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
  deleteSurveyQuestion(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("SurveyQuestions/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
  deleteSurveyAnswerPool(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("SurveyAnswersPool/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
