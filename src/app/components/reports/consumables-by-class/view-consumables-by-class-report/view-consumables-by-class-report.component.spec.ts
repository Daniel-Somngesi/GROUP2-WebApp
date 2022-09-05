import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsumablesByClassReportComponent } from './view-consumables-by-class-report.component';

describe('ViewConsumablesByClassReportComponent', () => {
  let component: ViewConsumablesByClassReportComponent;
  let fixture: ComponentFixture<ViewConsumablesByClassReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConsumablesByClassReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsumablesByClassReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
