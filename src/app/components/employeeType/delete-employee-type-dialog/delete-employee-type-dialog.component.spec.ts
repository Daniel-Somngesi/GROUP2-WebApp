import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmployeeTypeDialogComponent } from './delete-employee-type-dialog.component';

describe('DeleteEmployeeTypeDialogComponent', () => {
  let component: DeleteEmployeeTypeDialogComponent;
  let fixture: ComponentFixture<DeleteEmployeeTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEmployeeTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEmployeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
