import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EntriesService } from './entries.service';

describe('EntriesService', () => {
  let service: EntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    }).compileComponents();
    service = TestBed.inject(EntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
