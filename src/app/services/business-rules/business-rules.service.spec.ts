import { TestBed } from '@angular/core/testing';

import { BusinessRulesService } from './business-rules.service';

describe('BusinessRulesService', () => {
  let service: BusinessRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
