import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSurveyQuestionAnswerOptionComponent } from './update-survey-question-answer-option.component';

describe('UpdateSurveyQuestionAnswerOptionComponent', () => {
  let component: UpdateSurveyQuestionAnswerOptionComponent;
  let fixture: ComponentFixture<UpdateSurveyQuestionAnswerOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSurveyQuestionAnswerOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSurveyQuestionAnswerOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
