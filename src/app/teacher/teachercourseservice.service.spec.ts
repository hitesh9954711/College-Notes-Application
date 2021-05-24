import { TestBed } from '@angular/core/testing';

import { TeachercourseserviceService } from './teachercourseservice.service';

describe('TeachercourseserviceService', () => {
  let service: TeachercourseserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachercourseserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
