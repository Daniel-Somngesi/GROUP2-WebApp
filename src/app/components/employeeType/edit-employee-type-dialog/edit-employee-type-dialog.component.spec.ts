import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeTypeDialogComponent } from './edit-employee-type-dialog.component';

describe('EditEmployeeTypeDialogComponent', () => {
  let component: EditEmployeeTypeDialogComponent;
  let fixture: ComponentFixture<EditEmployeeTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
