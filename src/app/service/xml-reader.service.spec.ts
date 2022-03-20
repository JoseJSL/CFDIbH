import { TestBed } from '@angular/core/testing';

import { XMLReaderService } from './xml-reader.service';

describe('XMLReaderService', () => {
  let service: XMLReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XMLReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
