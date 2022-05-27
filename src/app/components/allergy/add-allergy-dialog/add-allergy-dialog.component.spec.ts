import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergyDialogComponent } from './add-allergy-dialog.component';

describe('AddAllergyDialogComponent', () => {
  let component: AddAllergyDialogComponent;
  let fixture: ComponentFixture<AddAllergyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllergyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllergyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
