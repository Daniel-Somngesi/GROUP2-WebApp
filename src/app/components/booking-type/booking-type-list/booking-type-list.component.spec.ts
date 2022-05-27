import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTypeListComponent } from './booking-type-list.component';

describe('BookingTypeListComponent', () => {
  let component: BookingTypeListComponent;
  let fixture: ComponentFixture<BookingTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
