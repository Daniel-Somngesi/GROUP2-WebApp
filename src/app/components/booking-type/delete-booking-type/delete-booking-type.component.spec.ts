import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookingTypeComponent } from './delete-booking-type.component';

describe('DeleteBookingTypeComponent', () => {
  let component: DeleteBookingTypeComponent;
  let fixture: ComponentFixture<DeleteBookingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
