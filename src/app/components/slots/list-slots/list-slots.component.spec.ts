import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSlotsComponent } from './list-slots.component';

describe('ListSlotsComponent', () => {
  let component: ListSlotsComponent;
  let fixture: ComponentFixture<ListSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
