import { TestBed } from '@angular/core/testing';

import { CalendarioReservasService } from './calendario-reservas.service';

describe('CalendarioReservasService', () => {
  let service: CalendarioReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
