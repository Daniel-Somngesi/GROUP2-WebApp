import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationsReportComponent } from './view-applications-report.component';

describe('ViewApplicationsReportComponent', () => {
  let component: ViewApplicationsReportComponent;
  let fixture: ComponentFixture<ViewApplicationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApplicationsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
