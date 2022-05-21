import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicalAidTypeDialogComponent } from './delete-medical-aid-type-dialog.component';

describe('DeleteMedicalAidTypeDialogComponent', () => {
  let component: DeleteMedicalAidTypeDialogComponent;
  let fixture: ComponentFixture<DeleteMedicalAidTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedicalAidTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicalAidTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
