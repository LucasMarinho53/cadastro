import { TestBed } from '@angular/core/testing';

import { FirebasefornecedorService } from './firebasefornecedor.service';

describe('FirebasefornecedorService', () => {
  let service: FirebasefornecedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasefornecedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
