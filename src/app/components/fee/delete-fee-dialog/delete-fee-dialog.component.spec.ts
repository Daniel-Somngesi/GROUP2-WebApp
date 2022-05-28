import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeeDialogComponent } from './delete-fee-dialog.component';

describe('DeleteFeeDialogComponent', () => {
  let component: DeleteFeeDialogComponent;
  let fixture: ComponentFixture<DeleteFeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFeeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
