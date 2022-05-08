import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserRoleDialogComponent } from './edit-user-role-dialog.component';

describe('EditUserRoleDialogComponent', () => {
  let component: EditUserRoleDialogComponent;
  let fixture: ComponentFixture<EditUserRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserRoleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
