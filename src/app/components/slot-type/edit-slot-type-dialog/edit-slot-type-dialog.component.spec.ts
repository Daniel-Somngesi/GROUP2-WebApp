import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlotTypeDialogComponent } from './edit-slot-type-dialog.component';

describe('EditSlotTypeDialogComponent', () => {
  let component: EditSlotTypeDialogComponent;
  let fixture: ComponentFixture<EditSlotTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSlotTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlotTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
