import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApplicationsReportComponent } from './generate-applications-report.component';

describe('GenerateApplicationsReportComponent', () => {
  let component: GenerateApplicationsReportComponent;
  let fixture: ComponentFixture<GenerateApplicationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateApplicationsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateApplicationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
