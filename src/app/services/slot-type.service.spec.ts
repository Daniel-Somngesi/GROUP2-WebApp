import { TestBed } from '@angular/core/testing';

import { SlotTypeService } from './slot-type.service';

describe('SlotTypeService', () => {
  let service: SlotTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
