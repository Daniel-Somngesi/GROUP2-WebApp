import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllergyDialogComponent } from './edit-allergy-dialog.component';

describe('EditAllergyDialogComponent', () => {
  let component: EditAllergyDialogComponent;
  let fixture: ComponentFixture<EditAllergyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAllergyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllergyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
