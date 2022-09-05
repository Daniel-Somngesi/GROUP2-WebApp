import { TestBed } from '@angular/core/testing';

import { SurveyAnswersPoolService } from './survey-answers-pool.service';

describe('SurveyAnswersPoolService', () => {
  let service: SurveyAnswersPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnswersPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
