import { TestBed } from '@angular/core/testing';

import { TeacherApiServiceService } from './teacher-api-service.service';

describe('TeacherApiServiceService', () => {
  let service: TeacherApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
