import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEvaluationReportComponent } from './school-evaluation-report.component';

describe('SchoolEvaluationReportComponent', () => {
  let component: SchoolEvaluationReportComponent;
  let fixture: ComponentFixture<SchoolEvaluationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolEvaluationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolEvaluationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
