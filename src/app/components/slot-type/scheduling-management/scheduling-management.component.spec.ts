import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingManagementComponent } from './scheduling-management.component';

describe('SchedulingManagementComponent', () => {
  let component: SchedulingManagementComponent;
  let fixture: ComponentFixture<SchedulingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
