import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingsReportComponent } from './view-bookings-report.component';

describe('ViewBookingsReportComponent', () => {
  let component: ViewBookingsReportComponent;
  let fixture: ComponentFixture<ViewBookingsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookingsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookingsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
