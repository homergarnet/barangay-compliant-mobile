import { TestBed } from '@angular/core/testing';

import { ProfileInformationService } from './profile-information.service';

describe('ProfileInformationService', () => {
  let service: ProfileInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
