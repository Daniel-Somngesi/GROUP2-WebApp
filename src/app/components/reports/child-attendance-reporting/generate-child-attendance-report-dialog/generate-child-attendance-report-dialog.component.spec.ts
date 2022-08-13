import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateChildAttendanceReportDialogComponent } from './generate-child-attendance-report-dialog.component';

describe('GenerateChildAttendanceReportDialogComponent', () => {
  let component: GenerateChildAttendanceReportDialogComponent;
  let fixture: ComponentFixture<GenerateChildAttendanceReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateChildAttendanceReportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateChildAttendanceReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
