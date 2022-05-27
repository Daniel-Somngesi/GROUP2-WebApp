import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSlotTypeDialogComponent } from './delete-slot-type-dialog.component';

describe('DeleteSlotTypeDialogComponent', () => {
  let component: DeleteSlotTypeDialogComponent;
  let fixture: ComponentFixture<DeleteSlotTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSlotTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSlotTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
