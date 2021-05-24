import { TestBed } from '@angular/core/testing';

import { TeacherGuardGuard } from './teacher-guard.guard';

describe('TeacherGuardGuard', () => {
  let guard: TeacherGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TeacherGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
