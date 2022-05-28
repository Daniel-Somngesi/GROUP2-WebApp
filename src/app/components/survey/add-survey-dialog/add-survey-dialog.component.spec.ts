import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveyDialogComponent } from './add-survey-dialog.component';

describe('AddSurveyDialogComponent', () => {
  let component: AddSurveyDialogComponent;
  let fixture: ComponentFixture<AddSurveyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSurveyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSurveyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
