import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSurveyQuestionsComponent } from './list-survey-questions.component';

describe('ListSurveyQuestionsComponent', () => {
  let component: ListSurveyQuestionsComponent;
  let fixture: ComponentFixture<ListSurveyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSurveyQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSurveyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
