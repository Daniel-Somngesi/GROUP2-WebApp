import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestedConsumablesComponent } from './list-requested-consumables.component';

describe('ListRequestedConsumablesComponent', () => {
  let component: ListRequestedConsumablesComponent;
  let fixture: ComponentFixture<ListRequestedConsumablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequestedConsumablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestedConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
