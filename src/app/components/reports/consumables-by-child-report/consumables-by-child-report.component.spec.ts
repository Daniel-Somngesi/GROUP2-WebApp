import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumablesByChildReportComponent } from './consumables-by-child-report.component';

describe('ConsumablesByChildReportComponent', () => {
  let component: ConsumablesByChildReportComponent;
  let fixture: ComponentFixture<ConsumablesByChildReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumablesByChildReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumablesByChildReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
