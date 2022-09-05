import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEnrollmentComponent } from './delete-enrollment.component';

describe('DeleteEnrollmentComponent', () => {
  let component: DeleteEnrollmentComponent;
  let fixture: ComponentFixture<DeleteEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEnrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
