import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateConsumablesByClassReportComponent } from './generate-consumables-by-class-report.component';

describe('GenerateConsumablesByClassReportComponent', () => {
  let component: GenerateConsumablesByClassReportComponent;
  let fixture: ComponentFixture<GenerateConsumablesByClassReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateConsumablesByClassReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateConsumablesByClassReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
