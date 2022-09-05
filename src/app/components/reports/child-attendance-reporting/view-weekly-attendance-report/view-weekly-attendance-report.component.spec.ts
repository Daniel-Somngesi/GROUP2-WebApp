import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeeklyAttendanceReportComponent } from './view-weekly-attendance-report.component';

describe('ViewWeeklyAttendanceReportComponent', () => {
  let component: ViewWeeklyAttendanceReportComponent;
  let fixture: ComponentFixture<ViewWeeklyAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWeeklyAttendanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWeeklyAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
