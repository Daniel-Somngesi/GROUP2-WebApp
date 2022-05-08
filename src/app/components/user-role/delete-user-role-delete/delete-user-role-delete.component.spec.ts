import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserRoleDeleteComponent } from './delete-user-role-delete.component';

describe('DeleteUserRoleDeleteComponent', () => {
  let component: DeleteUserRoleDeleteComponent;
  let fixture: ComponentFixture<DeleteUserRoleDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserRoleDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserRoleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
