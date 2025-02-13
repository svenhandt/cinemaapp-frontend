import { TestBed } from '@angular/core/testing';

import { PresentationsOverviewService } from './presentations-overview.service';

describe('PresentationsOverviewService', () => {
  let service: PresentationsOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentationsOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
