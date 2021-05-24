import { TestBed } from '@angular/core/testing';

import { StudentGuardGuard } from './student-guard.guard';

describe('StudentGuardGuard', () => {
  let guard: StudentGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudentGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
