import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnrollmentsComponent } from './list-enrollments.component';

describe('ListEnrollmentsComponent', () => {
  let component: ListEnrollmentsComponent;
  let fixture: ComponentFixture<ListEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnrollmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
