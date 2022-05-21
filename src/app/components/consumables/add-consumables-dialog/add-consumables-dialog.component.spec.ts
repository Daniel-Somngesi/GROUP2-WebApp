import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsumablesDialogComponent } from './add-consumables-dialog.component';

describe('AddConsumablesDialogComponent', () => {
  let component: AddConsumablesDialogComponent;
  let fixture: ComponentFixture<AddConsumablesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsumablesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsumablesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
