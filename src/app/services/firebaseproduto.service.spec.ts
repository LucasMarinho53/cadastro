import { TestBed } from '@angular/core/testing';

import { FirebaseprodutoService } from './firebaseproduto.service';

describe('FirebaseService', () => {
  let service: FirebaseprodutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseprodutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
