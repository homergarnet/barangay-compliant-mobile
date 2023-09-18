import { TestBed } from '@angular/core/testing';

import { HasVisitedGuard } from './has-visited.guard';

describe('HasVisitedGuard', () => {
  let guard: HasVisitedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasVisitedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
