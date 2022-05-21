import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalAidTypeDialogComponent } from './add-medical-aid-type-dialog.component';

describe('AddMedicalAidTypeDialogComponent', () => {
  let component: AddMedicalAidTypeDialogComponent;
  let fixture: ComponentFixture<AddMedicalAidTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicalAidTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalAidTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
