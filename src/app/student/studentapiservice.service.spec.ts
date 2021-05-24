import { TestBed } from '@angular/core/testing';

import { StudentapiserviceService } from './studentapiservice.service';

describe('StudentapiserviceService', () => {
  let service: StudentapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
