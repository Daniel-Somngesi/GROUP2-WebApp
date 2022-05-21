import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsumablesDialogComponent } from './edit-consumables-dialog.component';

describe('EditConsumablesDialogComponent', () => {
  let component: EditConsumablesDialogComponent;
  let fixture: ComponentFixture<EditConsumablesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConsumablesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConsumablesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
