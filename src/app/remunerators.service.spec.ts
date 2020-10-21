import { TestBed } from '@angular/core/testing';

import { RemuneratorsService } from './remunerators.service';

describe('RemuneratorsService', () => {
  let service: RemuneratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemuneratorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
