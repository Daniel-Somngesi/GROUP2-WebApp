import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSurveyResultsComponent } from './view-survey-results.component';

describe('ViewSurveyResultsComponent', () => {
  let component: ViewSurveyResultsComponent;
  let fixture: ComponentFixture<ViewSurveyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSurveyResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSurveyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
