import { TestBed } from '@angular/core/testing';

import { BusinessHourHelperService } from './business-hour-helper.service';

describe('BusinessHourHelperService', () => {
  let service: BusinessHourHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessHourHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
