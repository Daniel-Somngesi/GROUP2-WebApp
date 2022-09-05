import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionAnswerOptionsComponent } from './survey-question-answer-options.component';

describe('SurveyQuestionAnswerOptionsComponent', () => {
  let component: SurveyQuestionAnswerOptionsComponent;
  let fixture: ComponentFixture<SurveyQuestionAnswerOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyQuestionAnswerOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyQuestionAnswerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
