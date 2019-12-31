import { TestBed } from '@angular/core/testing';

import { AzsignalrService } from './azsignalr.service';

describe('AzsignalrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AzsignalrService = TestBed.get(AzsignalrService);
    expect(service).toBeTruthy();
  });
});
