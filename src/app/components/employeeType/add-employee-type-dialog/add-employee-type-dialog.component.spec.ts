import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeTypeDialogComponent } from './add-employee-type-dialog.component';

describe('AddEmployeeTypeDialogComponent', () => {
  let component: AddEmployeeTypeDialogComponent;
  let fixture: ComponentFixture<AddEmployeeTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
