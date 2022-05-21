import { TestBed } from '@angular/core/testing';

import { MedicalAidTypeService } from './medical-aid-type.service';

describe('MedicalAidTypeService', () => {
  let service: MedicalAidTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalAidTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
