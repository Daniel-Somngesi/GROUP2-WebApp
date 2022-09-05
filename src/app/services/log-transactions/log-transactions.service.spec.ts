import { TestBed } from '@angular/core/testing';

import { LogTransactionsService } from './log-transactions.service';

describe('LogTransactionsService', () => {
  let service: LogTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
