import { TestBed } from '@angular/core/testing';

import { InspirationWallService } from './inspiration-wall.service';

describe('InspirationWallService', () => {
  let service: InspirationWallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspirationWallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
