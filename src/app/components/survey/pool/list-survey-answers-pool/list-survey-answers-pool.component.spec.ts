import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSurveyAnswersPoolComponent } from './list-survey-answers-pool.component';

describe('ListSurveyAnswersPoolComponent', () => {
  let component: ListSurveyAnswersPoolComponent;
  let fixture: ComponentFixture<ListSurveyAnswersPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSurveyAnswersPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSurveyAnswersPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
