import { TestBed } from '@angular/core/testing';

import { AzSignalRService } from './azsignalr.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AzSignalRService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AzSignalRService = TestBed.get(AzSignalRService);
    expect(service).toBeTruthy();
  });
});
