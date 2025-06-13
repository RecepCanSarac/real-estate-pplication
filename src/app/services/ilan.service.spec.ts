import { TestBed } from '@angular/core/testing';

import { IlanService } from './ilan.service';

describe('IlanService', () => {
  let service: IlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
