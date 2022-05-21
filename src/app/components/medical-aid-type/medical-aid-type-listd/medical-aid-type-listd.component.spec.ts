import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAidTypeListdComponent } from './medical-aid-type-listd.component';

describe('MedicalAidTypeListdComponent', () => {
  let component: MedicalAidTypeListdComponent;
  let fixture: ComponentFixture<MedicalAidTypeListdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalAidTypeListdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAidTypeListdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
