import { TestBed } from '@angular/core/testing';

import { CompliantGuard } from './compliant.guard';

describe('CompliantGuard', () => {
  let guard: CompliantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompliantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
