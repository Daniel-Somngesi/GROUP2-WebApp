import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurveyDialogComponent } from './edit-survey-dialog.component';

describe('EditSurveyDialogComponent', () => {
  let component: EditSurveyDialogComponent;
  let fixture: ComponentFixture<EditSurveyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSurveyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurveyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
