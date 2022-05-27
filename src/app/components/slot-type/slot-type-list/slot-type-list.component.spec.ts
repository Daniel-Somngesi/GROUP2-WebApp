import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTypeListComponent } from './slot-type-list.component';

describe('SlotTypeListComponent', () => {
  let component: SlotTypeListComponent;
  let fixture: ComponentFixture<SlotTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
