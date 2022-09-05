import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceivedConsumablesComponent } from './list-received-consumables.component';

describe('ListReceivedConsumablesComponent', () => {
  let component: ListReceivedConsumablesComponent;
  let fixture: ComponentFixture<ListReceivedConsumablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceivedConsumablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivedConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
