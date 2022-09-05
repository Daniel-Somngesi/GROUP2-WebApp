import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveConsumablesComponent } from './receive-consumables.component';

describe('ReceiveConsumablesComponent', () => {
  let component: ReceiveConsumablesComponent;
  let fixture: ComponentFixture<ReceiveConsumablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveConsumablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
