import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingTypeComponent } from './add-booking-type.component';

describe('AddBookingTypeComponent', () => {
  let component: AddBookingTypeComponent;
  let fixture: ComponentFixture<AddBookingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
