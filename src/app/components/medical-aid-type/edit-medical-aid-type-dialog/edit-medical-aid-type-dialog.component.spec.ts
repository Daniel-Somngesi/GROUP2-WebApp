import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalAidTypeDialogComponent } from './edit-medical-aid-type-dialog.component';

describe('EditMedicalAidTypeDialogComponent', () => {
  let component: EditMedicalAidTypeDialogComponent;
  let fixture: ComponentFixture<EditMedicalAidTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMedicalAidTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalAidTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
