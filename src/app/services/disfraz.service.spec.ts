import { TestBed } from '@angular/core/testing';

import { DisfrazService } from './disfraz.service';

describe('DisfrazService', () => {
  let service: DisfrazService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisfrazService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
