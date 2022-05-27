import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlotTypeDialogComponent } from './add-slot-type-dialog.component';

describe('AddSlotTypeDialogComponent', () => {
  let component: AddSlotTypeDialogComponent;
  let fixture: ComponentFixture<AddSlotTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSlotTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlotTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
