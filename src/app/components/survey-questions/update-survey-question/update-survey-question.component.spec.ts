import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSurveyQuestionComponent } from './update-survey-question.component';

describe('UpdateSurveyQuestionComponent', () => {
  let component: UpdateSurveyQuestionComponent;
  let fixture: ComponentFixture<UpdateSurveyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSurveyQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
