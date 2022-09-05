import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSurveyQuestionComponent } from './delete-survey-question.component';

describe('DeleteSurveyQuestionComponent', () => {
  let component: DeleteSurveyQuestionComponent;
  let fixture: ComponentFixture<DeleteSurveyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSurveyQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
