import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllergyDialogComponent } from './delete-allergy-dialog.component';

describe('DeleteAllergyDialogComponent', () => {
  let component: DeleteAllergyDialogComponent;
  let fixture: ComponentFixture<DeleteAllergyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAllergyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAllergyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
