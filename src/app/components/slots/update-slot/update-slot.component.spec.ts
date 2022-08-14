import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSlotComponent } from './update-slot.component';

describe('UpdateSlotComponent', () => {
  let component: UpdateSlotComponent;
  let fixture: ComponentFixture<UpdateSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
