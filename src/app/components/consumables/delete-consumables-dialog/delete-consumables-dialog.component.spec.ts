import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConsumablesDialogComponent } from './delete-consumables-dialog.component';

describe('DeleteConsumablesDialogComponent', () => {
  let component: DeleteConsumablesDialogComponent;
  let fixture: ComponentFixture<DeleteConsumablesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConsumablesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConsumablesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
