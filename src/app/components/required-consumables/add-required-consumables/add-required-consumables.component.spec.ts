import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequiredConsumablesComponent } from './add-required-consumables.component';

describe('AddRequiredConsumablesComponent', () => {
  let component: AddRequiredConsumablesComponent;
  let fixture: ComponentFixture<AddRequiredConsumablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequiredConsumablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequiredConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
