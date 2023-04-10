import { TestBed } from '@angular/core/testing';

import { RussianCitiesService } from './russian-cities.service';

describe('RussianCitiesService', () => {
  let service: RussianCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RussianCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
