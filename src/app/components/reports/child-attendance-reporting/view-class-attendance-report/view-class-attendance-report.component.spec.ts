import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassAttendanceReportComponent } from './view-class-attendance-report.component';

describe('ViewClassAttendanceReportComponent', () => {
  let component: ViewClassAttendanceReportComponent;
  let fixture: ComponentFixture<ViewClassAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClassAttendanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
