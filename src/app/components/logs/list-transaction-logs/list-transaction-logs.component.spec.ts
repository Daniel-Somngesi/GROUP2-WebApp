import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransactionLogsComponent } from './list-transaction-logs.component';

describe('ListTransactionLogsComponent', () => {
  let component: ListTransactionLogsComponent;
  let fixture: ComponentFixture<ListTransactionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTransactionLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransactionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
